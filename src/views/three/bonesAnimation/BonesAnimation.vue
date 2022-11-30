<style lang="scss" scoped>
 @import './scss';
</style>
<template>
  <div id="bones"></div>
</template>

<script lang="ts" setup>

import { onMounted, onUnmounted,ref } from 'vue';

import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import  { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'


import { GUI } from 'lil-gui';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';





let camera:THREE.PerspectiveCamera
let scene:THREE.Scene
let renderer:THREE.WebGLRenderer
let orbControls:OrbitControls
let animateID:number

let mixer:THREE.AnimationMixer


let skeleton:THREE.SkeletonHelper
let model:THREE.Group
let settings:any

// 性能监控器
let stats:Stats

// 动作
let idleAction:THREE.AnimationAction
let walkAction:THREE.AnimationAction
let runAction:THREE.AnimationAction
let actions:THREE.AnimationAction[]

let idleWeight:number, walkWeight:number, runWeight:number;

let singleStepMode = false;
let sizeOfNextStep = 0;
// 创建一个时钟对象Clock
let clock:THREE.Clock;
const crossFadeControls:any[] = [];





onMounted(()=>{
   init()
})

onUnmounted(()=>{
  orbControls.removeEventListener('change',render)
  window.cancelAnimationFrame(animateID)
  destroyModel()
})



// 初始化函数
function init(){
   
  // 获取容器元素
  const elem  = document.querySelector('#bones')
  if (!elem) return
  const _width = elem.clientWidth
  const _height = elem.clientHeight

  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color( 0xa0a0a0 );
	scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 ); // 设置雾



  // 创建环境光
  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	hemiLight.position.set( 0, 20, 0 );
	scene.add(hemiLight);

  // 创建方向光
  const dirLight = new THREE.DirectionalLight( 0xffffff );
  dirLight.position.set( - 3, 10, - 10 );
   // 开启阴影
  dirLight.castShadow = true; 
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = - 2;
  dirLight.shadow.camera.left = - 2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add( dirLight );
   
  // 创建地板 ground

  const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true; // 接受阴影
	scene.add( mesh );


   // 加载gltf文件
  const loader = new GLTFLoader();
	loader.load( location.origin + '/model/gltf/Soldier.glb',
    function ( gltf:GLTF ) {
      console.log(gltf)
	 	  model = gltf.scene;
	 	  scene.add( model );
      
      // 遍历文件的模型并添加阴影
	 	  model.traverse( function ( object:any ) {
	 	  	if ( object.isMesh ) object.castShadow = true;
	 	  } );

	 	  // 添加骨骼辅助系统
	 	  skeleton = new THREE.SkeletonHelper( model );
	 	  skeleton.visible = false;
	 	  scene.add( skeleton );

	 	  // 创建操作面板
	 	  createPanel();

	 	  //添加动画
	 	  const animations = gltf.animations;
	 	  mixer = new THREE.AnimationMixer( model );
	 	  idleAction = mixer.clipAction( animations[ 0 ] );
	 	  walkAction = mixer.clipAction( animations[ 3 ] );
	 	  runAction = mixer.clipAction( animations[ 1 ] );
	 	  actions = [ idleAction, walkAction, runAction ];

	 	  activateAllActions();
	 	  render();
	  },// called while loading is progressing
	  function ( xhr ) {
	  	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	  },
	  // called when loading has errors
	  function ( error ) {
	  	console.log( 'An error happened' );
	  });



  // 创建相机
  camera = new THREE.PerspectiveCamera(60,_width / _height,1,10000)
  camera.position.set( 1, 2, - 3 );
	camera.lookAt( 0, 1, 0 );
	clock = new THREE.Clock();

  scene.add(camera)


  //创建渲染器
  renderer = new THREE.WebGLRenderer({antialias:true})
  renderer.setSize(_width,_height)
  renderer.setPixelRatio(window.devicePixelRatio) // 设置像素比
  renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	elem.appendChild( renderer.domElement );
  // 性能检测
	stats = Stats();
  stats.dom.style.position = 'absolute'
	elem.appendChild( stats.dom );
	window.addEventListener( 'resize', onWindowResize );
}



// 创建操作面板
function createPanel() {
  const panel = new GUI( { width: 310 } );
  panel.domElement.style.position = 'absolute'
  document.querySelector('#bones')?.appendChild(panel.domElement)
 
  console.log(panel)
   
  // 创建折叠面板
  const folder1 = panel.addFolder( 'Visibility' );
  const folder2 = panel.addFolder( 'Activation/Deactivation' );
  const folder3 = panel.addFolder( 'Pausing/Stepping' );
  const folder4 = panel.addFolder( 'Crossfading' );
  const folder5 = panel.addFolder( 'Blend Weights' );
  const folder6 = panel.addFolder( 'General Speed' );
  
  // 设置控制面板可配置项
  settings = {

    'show model': true,  // 是否展现模型
    'show skeleton': false, // 是否展现骨骼

    'deactivate all': deactivateAllActions,   // 停止所有动画
    'activate all': activateAllActions,  //激活所有动画

    'pause/continue': pauseContinue,   //暂停/继续
    'make single step': toSingleStepMode, // 展示当前帧
    'modify step size': 0.05,  // 设置模型每帧动画占比

    'from walk to idle': function () {  // 动画过渡 walk to idle
      prepareCrossFade( walkAction, idleAction, 1.0 );
  
    },
    'from idle to walk': function () {  // 动画过渡 idle to walk
  
      prepareCrossFade( idleAction, walkAction, 0.5 );
  
    },
    'from walk to run': function () { // 动画过渡 walk to run
  
      prepareCrossFade( walkAction, runAction, 2.5 );
  
    },
    'from run to walk': function () { // 动画过渡  run to walk
  
      prepareCrossFade( runAction, walkAction, 5.0 );
  
    },

    'use default duration': true,
    'set custom duration': 3.5,
    'modify idle weight': 0.0,
    'modify walk weight': 1.0,
    'modify run weight': 0.0,
    'modify time scale': 1.0
  };

  folder1.add( settings, 'show model' ).onChange( showModel );
	folder1.add( settings, 'show skeleton' ).onChange( showSkeleton );

	folder2.add( settings, 'deactivate all' );
	folder2.add( settings, 'activate all' );

	folder3.add( settings, 'pause/continue' );
	folder3.add( settings, 'make single step' );
	folder3.add( settings, 'modify step size', 0.01, 0.1, 0.001 );

	crossFadeControls.push( folder4.add( settings, 'from walk to idle' ) );
	crossFadeControls.push( folder4.add( settings, 'from idle to walk' ) );
	crossFadeControls.push( folder4.add( settings, 'from walk to run' ) );
	crossFadeControls.push( folder4.add( settings, 'from run to walk' ) );
	folder4.add( settings, 'use default duration' );
	folder4.add( settings, 'set custom duration', 0, 10, 0.01 );

	folder5.add( settings, 'modify idle weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight:number ) {
		setWeight( idleAction, weight );
	} );
	folder5.add( settings, 'modify walk weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight:number ) {
		setWeight( walkAction, weight );
	} );
	folder5.add( settings, 'modify run weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight:number ) {
		setWeight( runAction, weight );
	} );
	folder6.add( settings, 'modify time scale', 0.0, 1.5, 0.01 ).onChange( modifyTimeScale );
	
  // 默认展开所有折叠面板
  folder1.open();
	folder2.open();
	folder3.open();
	folder4.open();
	folder5.open();
	folder6.open();
}


function deactivateAllActions() {

  actions.forEach( function ( action ) {
  
    action.stop();
  
  } );

}

function activateAllActions() {

  // 设置动画权重
  setWeight( idleAction, settings[ 'modify idle weight' ] );
  setWeight( walkAction, settings[ 'modify walk weight' ] );
  setWeight( runAction, settings[ 'modify run weight' ] );
  
  actions.forEach( function ( action ) {
  
    action.play();
  
  } );

}

function showModel( visibility:boolean ) {

model.visible = visibility;

}


function showSkeleton( visibility:boolean ) {

skeleton.visible = visibility;

}


function modifyTimeScale( speed:number ) {

mixer.timeScale = speed;

}





 // 暂停或继续
function pauseContinue() {

if ( singleStepMode ) {

  singleStepMode = false;
  unPauseAllActions();

} else {

  if ( idleAction.paused ) {

    unPauseAllActions();

  } else {

    pauseAllActions();

  }

}

}

// 暂停所有动画
function pauseAllActions() {

actions.forEach( function ( action ) {

  action.paused = true;

} );

}

// 所有动画均不暂停
function unPauseAllActions() {

actions.forEach( function ( action ) {

  action.paused = false;

} );

}

function toSingleStepMode() {

  unPauseAllActions();
  
  singleStepMode = true;
  sizeOfNextStep = settings[ 'modify step size' ];

}

function prepareCrossFade( startAction:THREE.AnimationAction, endAction:THREE.AnimationAction, defaultDuration:number ) {

  // Switch default / custom crossfade duration (according to the user's choice)
  
  const duration = setCrossFadeDuration( defaultDuration );
  
  // Make sure that we don't go on in singleStepMode, and that all actions are unpaused
  
  singleStepMode = false;
  unPauseAllActions();
  
  // If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
  // else wait until the current action has finished its current loop
  
  if ( startAction === idleAction ) {
  
    executeCrossFade( startAction, endAction, duration );
  
  } else {
  
    synchronizeCrossFade( startAction, endAction, duration );
  
  }

}


// 设置动画淡出的持续时间
function setCrossFadeDuration( defaultDuration:number ) {

  // Switch default crossfade duration <-> custom crossfade duration
  
  if ( settings[ 'use default duration' ] ) {
  
    return defaultDuration;
  
  } else {
  
    return settings[ 'set custom duration' ];
  
  }

}

function synchronizeCrossFade( startAction:THREE.AnimationAction, endAction:THREE.AnimationAction, duration:number ) {

   mixer.addEventListener( 'loop', onLoopFinished );
   
   function onLoopFinished( event:any ) {
   
     if ( event.action === startAction ) {
   
       mixer.removeEventListener( 'loop', onLoopFinished );
   
       executeCrossFade( startAction, endAction, duration );
   
     }
   
   }

}

// 设置动画过渡成另一种动画
function executeCrossFade( startAction:THREE.AnimationAction, endAction:THREE.AnimationAction, duration:number ) {

  // Not only the start action, but also the end action must get a weight of 1 before fading
  // (concerning the start action this is already guaranteed in this place)
  
  setWeight( endAction, 1 );
  endAction.time = 0;
  
  // Crossfade with warping - you can also try without warping by setting the third parameter to false
  
  startAction.crossFadeTo( endAction, duration, true );

}



function setWeight( action:THREE.AnimationAction, weight:number ) {

     action.enabled = true;
     action.setEffectiveTimeScale( 1 );  // 设置动画时间比例以及停用所有的变形
     action.setEffectiveWeight( weight ); // 设置动画权重以及停止所有淡入淡出
   
}

// 更新控制面板的权重
function updateWeightSliders() {
   
   settings[ 'modify idle weight' ] = idleWeight;
   settings[ 'modify walk weight' ] = walkWeight;
   settings[ 'modify run weight' ] = runWeight;

}
// Called by the render loop

// 更新动画变换的可用按钮
function updateCrossFadeControls() {

  if ( idleWeight === 1 && walkWeight === 0 && runWeight === 0 ) {
  
    crossFadeControls[ 0 ].disable();
    crossFadeControls[ 1 ].enable();
    crossFadeControls[ 2 ].disable();
    crossFadeControls[ 3 ].disable();
  
  }
  
  if ( idleWeight === 0 && walkWeight === 1 && runWeight === 0 ) {
  
    crossFadeControls[ 0 ].enable();
    crossFadeControls[ 1 ].disable();
    crossFadeControls[ 2 ].enable();
    crossFadeControls[ 3 ].disable();
  
  }
  
  if ( idleWeight === 0 && walkWeight === 0 && runWeight === 1 ) {
  
    crossFadeControls[ 0 ].disable();
    crossFadeControls[ 1 ].disable();
    crossFadeControls[ 2 ].disable();
    crossFadeControls[ 3 ].enable();
  
  }

}



// 渲染函数
function render(){
  

				// Render loop

				requestAnimationFrame( render );
      
        // 更新动画权重
				idleWeight = idleAction?.getEffectiveWeight();
				walkWeight = walkAction?.getEffectiveWeight();
				runWeight = runAction?.getEffectiveWeight();
  
				// Update the panel values if weights are modified from "outside" (by crossfadings)

				updateWeightSliders();

				// Enable/disable crossfade controls according to current weight values

				updateCrossFadeControls();

				// Get the time elapsed since the last frame, used for mixer update (if not in single step mode)

				let mixerUpdateDelta = clock.getDelta();

				// If in single step mode, make one step and then do nothing (until the user clicks again)

				if ( singleStepMode ) {

					mixerUpdateDelta = sizeOfNextStep;
					sizeOfNextStep = 0;

				}

				// Update the animation mixer, the stats panel, and render this frame

				mixer.update( mixerUpdateDelta );

				stats.update();

				renderer.render( scene, camera );


}

function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

}
// 销毁模型
function destroyModel () {
  console.log('销毁模型')

  const elem = document.getElementById('vertex-structure')
  try {
    if(elem){
      // 离开页面停止动画

      scene.clear()
      renderer.dispose()
      renderer.forceContextLoss()
      const gl = renderer.domElement.getContext('webgl')
      gl&& gl.getExtension('WEBGL_lose_context')?.loseContext()
      elem.innerHTML = ''
      console.log('销毁成功')
    }
  } catch (e) {
    console.log(e)
    console.log('销毁失败')
  }
 }

</script>
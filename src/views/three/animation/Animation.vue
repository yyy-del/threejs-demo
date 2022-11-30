<style lang="scss" scoped>
 @import './scss';

</style>

<template>
   <div class="tools">
     <el-button class="bottom" @click="playStatusChange">{{isPause?'播放':'暂停'}}</el-button>
     <el-slider v-model="curTime"  :min='0' :max='20' @input="changeTime"/>
   </div>
   <div id="animation"></div>
</template>

<script lang="ts" setup>

import { onMounted, onUnmounted,ref } from 'vue';

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



let camera:THREE.Camera
let scene:THREE.Scene
let renderer:THREE.WebGLRenderer
let orbControls:OrbitControls
let animateID:number
let meshGroup = new THREE.Group()
let mixer:THREE.AnimationMixer
let clip:THREE.AnimationClip
let animationPlay:THREE.AnimationAction

let isPause = ref(false) // 播放状态
let curTime = ref(0)

onMounted(()=>{
   init()
})

onUnmounted(()=>{
  orbControls.removeEventListener('change',render)
  window.cancelAnimationFrame(animateID)
  destroyModel()
})

// 播放状态改变事件监听
const playStatusChange =()=>{
  isPause.value = !isPause.value
  animationPlay.paused = isPause.value ? true:false
}

// 拖动播放进度
const changeTime = (time:number)=>{
      // 开始结束时间设置为一样，相当于播放时间为0，直接跳转到时间点对应的状态
      animationPlay.time = time; //操作对象设置开始播放时间
      // clip.duration = animationPlay.time;//剪辑对象设置播放结束时间
      animationPlay.play(); //开始播放
}

// 初始化函数
function init(){
   
  // 获取容器元素
  const elem  = document.querySelector('#animation')

  if (!elem) return

  const _width = elem.clientWidth
  const _height = elem.clientHeight

  // 创建场景
  scene = new THREE.Scene()





  // 创建网格模型
  const ball = new THREE.SphereGeometry(20,32,40) 
  const ballMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00
  })
  const ballMesh = new THREE.Mesh(ball,ballMaterial)

  const box = new THREE.BoxGeometry(20,40,20)
  const boxMaterial = new THREE.MeshLambertMaterial({
    color:0x123456
  })
  const boxMesh = new THREE.Mesh(box,boxMaterial)
  boxMesh.position.set(100,0,0)

  boxMesh.name = "box"; //网格模型1命名
  ballMesh.name = "ball"; //网格模型2命名
  meshGroup.add(boxMesh); //网格模型添加到组中
  meshGroup.add(ballMesh); //网格模型添加到组中
  scene.add(meshGroup) 
 
  //设置并播放关键帧
  setAnimation()



  // 创建环境光
  const ambientLight = new THREE.AmbientLight(0xffffff,0.6)
  scene.add(ambientLight)
   


  // 创建相机
  camera = new THREE.PerspectiveCamera(60,_width / _height,1,10000)
  camera.position.set(300,10,300)
  camera.lookAt(scene.position)
  scene.add(camera)


  //创建渲染器
  renderer = new THREE.WebGLRenderer({antialias:true})
  renderer.setSize(_width,_height)
  renderer.setPixelRatio(window.devicePixelRatio) // 设置像素比
  renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
  
  elem.appendChild(renderer.domElement)

   //创建轨道控制器
   orbControls = new OrbitControls(camera,renderer.domElement)
   orbControls.addEventListener('change',render)
    
  const AxesHelper = new THREE.AxesHelper(400)
  scene.add(AxesHelper)
   render()
}

// 编辑meshGroup对象的模型帧动画
function setAnimation(){
  // 创建关键帧数据
  const times = [0,10]
  const value = [0,0,0,150,0,0,] 
  // 创建位置关键帧对象：0时刻对应位置0,0,0，    10 时刻对应位置150，0 ，0
  const posTrack = new THREE.KeyframeTrack('box.position',times,value)
  // 同理 创建颜色关键帧对象
  const colorTrack = new THREE.KeyframeTrack('box.material.color',[10,20],[1,0,0,0,0,1])
  // 创建缩放关键帧
  const scaleTrack = new THREE.KeyframeTrack('ball.scale',[0,20],[1,1,1,3,3,3])

  const duration = 20 // 设置默认播放时间，去所有动画帧最大时间
 
  clip = new THREE.AnimationClip('default',duration,[posTrack,colorTrack,scaleTrack])


  // 播放设置的关键帧

  mixer = new THREE.AnimationMixer(meshGroup)

  animationPlay = mixer.clipAction(clip)

  animationPlay.timeScale = 20 // 默认1 调节播放速度
  // animationPlay.loop = THREE.LoopOnce //不循环播放

  animationPlay.clampWhenFinished=true;   //暂停在最后一帧播放的状态
  animationPlay.play() //开始播放
}


// 创建一个时钟对象Clock
var clock = new THREE.Clock();

// 渲染函数
function render(){
  

  renderer.render(scene,camera)
   animateID =  requestAnimationFrame(render)
   //clock.getDelta()方法获得两帧的时间间隔
   // 更新混合器相关的时间
   mixer.update(clock.getDelta())

   curTime.value=animationPlay.time


 
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
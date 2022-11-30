<style lang="scss" scoped>
 @import './scss/index.scss';
</style>
<template>
  <div id="camera"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene:THREE.Scene
let cameraPSC:THREE.PerspectiveCamera
let cameraOGH :THREE.OrthographicCamera
let renderer:THREE.WebGLRenderer
let controls:OrbitControls
let animateID:number

onMounted(()=>{
  init()
})

onUnmounted(()=>{
  controls.removeEventListener('change',render)
  destroyModel()
})


function init(){
   // 获取容器元素
   const elem = document.getElementById('camera')
   if (!elem) return
   const width = elem.clientWidth
   const height =elem.clientHeight

   /* 创建场景 */
   scene = new THREE.Scene()


   // 创建几何体
   const geometry = new THREE.BoxGeometry(40,40,40)

   const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,   
   })
   const mesh = new THREE.Mesh(geometry,material)
   scene.add(mesh)
 
  // 创建环境光
  let ambientLight  = new THREE.AmbientLight(0xf0f0f0,0.6)
  scene.add(ambientLight)
  
  //  创建点光源
  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(0, 40, 0); //点光源位置
  
  scene.add(pointLight) 

   /* 创建透视相机 */ 
   cameraPSC = new THREE.PerspectiveCamera(60,width / height,0.1,10000)
   cameraPSC.position.set(210,210,210)
   cameraPSC.lookAt(scene.position)

   /* 创建正交相机 */
  //  let k = width / height; //窗口宽高比
  //  const s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
  //  cameraOGH = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  //  cameraOGH.position.set(210,210,210); //设置相机位置
  //  cameraOGH.lookAt(scene.position); //设置相机方向(指向的场景对象)

   //创建渲染器
   renderer = new THREE.WebGLRenderer({antialias:true})
   renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
   
   renderer.setSize(width,height)
   elem.appendChild(renderer.domElement)


   //创建轨道控制器
   if (cameraPSC) {
    controls = new OrbitControls(cameraPSC,renderer.domElement)
   }
   if (cameraOGH) {
    controls = new OrbitControls(cameraOGH,renderer.domElement)
   }

   controls.addEventListener('change',render)

   render()
}


function render(){
  if (cameraPSC) {
    renderer.render(scene,cameraPSC)
  }
  if (cameraOGH) {
    renderer.render(scene,cameraOGH)
  }

}

 /**
 * 销毁模型
*/
function destroyModel () {
  console.log('销毁模型')
  const elem = document.getElementById('camera')
  try {
    if(elem){
      // 离开页面停止动画
      window.cancelAnimationFrame(animateID)
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


// onresize 事件会在窗口被调整大小时发生
window.onresize=function(){
  // 重置渲染器输出画布canvas尺寸
  const elem = document.getElementById('camera')
   if (!elem) return
   const width = elem.clientWidth
   const height =elem.clientHeight


  renderer.setSize(width,height);
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比


   if (cameraPSC) {
    cameraPSC.aspect = width / height;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    cameraPSC.updateProjectionMatrix();
   }
   if (cameraOGH) {
    // 重置渲染器输出画布canvas尺寸
    // 重置相机投影的相关参数
    const k = width / height;//窗口宽高比
    const s = 150
    cameraOGH.left = -s*k;
    cameraOGH.right = s*k;
    cameraOGH.top = s;
    cameraOGH.bottom = -s;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    cameraOGH.updateProjectionMatrix ();
   }
   render()
};


</script>
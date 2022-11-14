<style lang="scss" scoped>
  @import './scss/index.scss';
</style>
<template>
   <div class="threeContainer">
      <div id="threePCD"  style="width: 100%;height: 100%;"></div>
      <div v-if="pcdPosInfoVisible" class="pcdPosInfo">{{pcdPosInfo}}</div>
   </div>
</template>
<script setup lang="ts">
import {ref, onMounted,  onBeforeUnmount } from 'vue';

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js'



let pcdPosInfo = ref('') //相机和中心点信息
let pcdPosInfoVisible = ref(false)  //是否显示相机和中心点信息
let animateID:number //动画的id标识


let mouse = new THREE.Vector2() // 设置中心点鼠标
let raycaster = new THREE.Raycaster() //这个类用于进行raycasting（光线投射）。 光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。

let scene:THREE.Scene 
let renderer:THREE.WebGLRenderer
let camera:THREE.PerspectiveCamera
let controls:OrbitControls

let centerPosition = [-30, 2, -1] //模型中心点

//model1
// const pcdDefaultInfo = {   //模型的默认设置 
//         center: [-30, 2, -1], // 默认中心点坐标
//         position: [-45, 0, -3], // 默认相机位置
//         target: [0, 0, 0] // 控制器聚焦
//       }

// Zaghetto
const pcdDefaultInfo = {   //模型的默认设置 
        center: [-0.41,-0.570, -0.52], // 默认中心点坐标
        position: [-0.02, -0.47, -0.88], // 默认相机位置
        target: [0, 0, 0] // 控制器聚焦
      }



const props =  defineProps({
  pcdSrc:String
})

onMounted(()=>{
  init()
  animate()
})
onBeforeUnmount(()=>{
  //离开页面  销毁模型
  destroyModel()
})
//初始化函数
function init() {
    /* 获取容器 */
    const elem:HTMLElement|null= document.getElementById('threePCD')

    if(elem){
     const width = elem.clientWidth ?? 0
     const height = elem.clientHeight ?? 0
     // console.log(width,height)
 
     /*创建场景 */
     scene = new THREE.Scene()
 
     /* 创建相机 */
     camera = new THREE.PerspectiveCamera(30,window.innerWidth / window.innerHeight,0.01,10000)
     camera.up.set(0,0,1) //将z轴设置向上 （默认y轴向上）
     // 将相机添加到scene场景中
     scene.add(camera)
 
     /* 创建渲染器 */
     renderer = new THREE.WebGLRenderer({antialias:true})   //antialias - 是否执行抗锯齿。默认为false.
     renderer.setPixelRatio(window.devicePixelRatio)  //设置渲染器像素比 ，这里设置为浏览器的设备的像素比
     renderer.setSize(width,height) //将渲染器的大小设置为渲染dom的大小
 
     /* 创建控制器 */
     controls = new OrbitControls(camera,renderer.domElement) //将相机和渲染器的dom加入到轨道控制器中 
     controls.addEventListener('change',render)   // 控制器变化 重新渲染
     controls.target = new THREE.Vector3(0,0,0)  //默认设置控制器的焦点为坐标(0 ,0 ,0)的地方，控制器将围绕这个焦点旋转
     controls.enableDamping = true 
     controls.dampingFactor = 0.1
     controls.keyPanSpeed = 5 //键盘控制速度
     controls.keys ={
       LEFT:'ArrowLeft',
       UP:'ArrowUp',
       RIGHT:'ArrowRight',
       BOTTOM:'ArrowBottom'
     },
     controls.listenToKeyEvents(window)
 
      /* 组合 */
     elem.appendChild(renderer.domElement)
     // 加载pcd文件
     loadPCD()
     /* 添加监听事件 */
     window.addEventListener('resize', onWindowResize)
     window.addEventListener('keypress', keyboard)
     elem.addEventListener('click', handlerClick)
    }
    
  
} 

function render() {
   let Html = ''
   renderer.render(scene, camera)
      const child = scene.children
      if (child.length > 0) {
        child.map(item => {
          if (item.type === 'Points') {
            Html += `center: (${item.position.x.toFixed(2)},${item.position.y.toFixed(2)},${item.position.z.toFixed(2)}); `
          }
        })
      }
      Html += `camera: (${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`
      pcdPosInfo.value = Html
      pcdPosInfoVisible.value = true
}
/**
 * 加载pcd模型文件
 */
function loadPCD(){
  if(props.pcdSrc){
     const loader:PCDLoader = new PCDLoader()
     
    loader.load(props.pcdSrc,(points)=>{
       points.position.set(pcdDefaultInfo.center[0], pcdDefaultInfo.center[1], pcdDefaultInfo.center[2])

       points.name = 'mypcd'  //给pcd命名

       scene.add(points)

       toggleView('frontView')  //设置视图方向
    },
    function (xhr) { //模型加载进度
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    }, 
    function (error) {
      // 加载出错
      console.log(error)

    })
  }else{
    console.log('no pcd file scr')
  }

}


/**
 * 动画
 */
function  animate () {
  animateID = requestAnimationFrame(animate)
  controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true

}

/**
 * 销毁模型
*/
function destroyModel () {
  console.log('销毁模型')
  const elem = document.getElementById('threePCDthreePCD')
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

function onWindowResize(){
  const elem:HTMLElement|null = document.getElementById('threePCD')
  const _width = elem?.clientWidth || 0
  const _height = elem?.clientHeight || 0
  camera.aspect = _width / _height
  camera.updateProjectionMatrix()
  renderer.setSize(_width, _height)
  render()
}
function keyboard(){
  console.log('keyboard')
}
function handlerClick(e:MouseEvent){
  if (e.ctrlKey) {
        const points = scene.getObjectByName('mypcd')
        if (!points) return
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        mouse.x = e.offsetX / renderer.domElement.clientWidth * 2 - 1
        mouse.y = -(e.offsetY / renderer.domElement.clientHeight * 2) + 1

        // 通过摄像机和鼠标位置更新射线
        raycaster.setFromCamera(mouse, camera)
        
        // 计算物体和射线的焦点
        const intersects = raycaster.intersectObjects(scene.children)

        if (intersects.length) {
          const selected = intersects[0]  //获取第一个焦点 并设为新的中心点
          // 计算中心点
          centerPosition[0] = centerPosition[0] - selected.point.x
          centerPosition[1] = centerPosition[1] - selected.point.y
          centerPosition[2] = centerPosition[2] - selected.point.z
          // 设置中心点
          points.position.set(centerPosition[0], centerPosition[1],centerPosition[2])
          
          render()

          console.log(selected.point)
        }
      }
}
function toggleView(view:string){
  switch (view) {
    case 'frontView':
       camera.position.set(pcdDefaultInfo.position[0],pcdDefaultInfo.position[1],pcdDefaultInfo.position[2])
      break; 
    default:
      break;
  }
  controls.update()
  controls.saveState()
  render()
}







  
</script>



<style lang="scss" scoped>
 @import './scss';
</style>

<template>
  <div id="sprite"></div>
</template>

<script lang="ts" setup>

import { onMounted, onUnmounted } from 'vue';

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * 
 * 
  精灵（sprite）是一个总是面朝着摄像机的平面，通常含有使用一个半透明的纹理。

  精灵（sprite）不会投射任何阴影，即使设置了
 * 
 * 
 * 
 */


let camera:THREE.Camera
let scene:THREE.Scene
let renderer:THREE.WebGLRenderer
let orbControls:OrbitControls
let animateID:number

onMounted(()=>{
   init()
})

onUnmounted(()=>{
  orbControls.removeEventListener('change',render)
  window.cancelAnimationFrame(animateID) //清湖动画
  destroyModel()
})

// 初始化函数
function init(){
   
  // 获取容器元素
  const elem  = document.querySelector('#sprite')

  if (!elem) return

  const _width = elem.clientWidth
  const _height = elem.clientHeight

  // 创建场景
  scene = new THREE.Scene()


  // 创建环境光

  const ambientLight = new THREE.AmbientLight(0xffffff,0.6)
  scene.add(ambientLight)
   
  // 添加草地模型
  addGrass()
  // 添加数的模型和纹理
  addTree()
  // 添加下雨效果
  addRain()


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



   render()
}



//添加草地模型
 function addGrass(){
   // 创建一个草地平面
   let grassPlan = new THREE.PlaneGeometry(1000,1000)  // 矩形平面
  // 加载草地纹理贴图
  const src = import.meta.env.IS_GITHUB ?  location.origin + '/' + import.meta.env.SPLICING + '/img/grasslight-big.jpg':  location.origin + '/img/grasslight-big.jpg'
   new THREE.TextureLoader().load(src,(grassTexture)=>{
     grassTexture.wrapS = THREE.RepeatWrapping
     grassTexture.wrapT = THREE.RepeatWrapping
  
     grassTexture.repeat.set(10,10)

     const grassMaterial = new THREE.MeshLambertMaterial({
       color:0x777700,
       map:grassTexture,
       side:THREE.DoubleSide
     })
   
     const grassMesh = new THREE.Mesh(grassPlan,grassMaterial)
     grassMesh.rotateX(Math.PI / 2)
     scene.add(grassMesh)
     render()
   })



}
// 添加树
function addTree(){
  const src = import.meta.env.IS_GITHUB ?  location.origin + '/' + import.meta.env.SPLICING + '/img/tree-02.png' : location.origin + '/img/tree-02.png'
  
  new THREE.TextureLoader().load(src,(treeTexture)=>{
    for (let i = 0; i < 100; i++) {
       
      let treeSpriteMaterial = new THREE.SpriteMaterial({
        map:treeTexture
      })

      // 创建精灵模型对象
      let treeSprite = new THREE.Sprite(treeSpriteMaterial)
      scene.add(treeSprite)

      // 控制大小
      treeSprite.scale.set(100,100,1)

      const k1 = Math.random() - 0.5
      const k2 = Math.random() - 0.5

      treeSprite.position.set(1000 * k1,45,1000 *k2)
      
    }
    render()

  })
} 

let rainGroup = new THREE.Group()

function addRain(){
  const src =  import.meta.env.IS_GITHUB ?  location.origin + '/' + import.meta.env.SPLICING +  '/img/sprite.png':location.origin + '/img/sprite.png'

   new THREE.TextureLoader().load(src,(Texture)=>{
    for (let i = 0 ;i < 400 ;i++){
           // 创建精灵模型
      const rainMaterial = new THREE.SpriteMaterial({
        map:Texture
      })
      // 创建精灵对象
      const rainSprite = new THREE.Sprite(rainMaterial)
      rainGroup.add(rainSprite)

      rainSprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
      let k1 = Math.random() - 0.5;
      let k2 = Math.random() - 0.5;
      let k3 = Math.abs(Math.random() - 0.5);
      // 设置精灵模型位置，在整个空间上上随机分布
      rainSprite.position.set(1000 * k1, 400*k3, 1000 * k2)
    }
    scene.add(rainGroup)
    render()
   })
}



// 渲染函数
function render(){
  // 改变雨滴坐标
  if(rainGroup && rainGroup.children.length > 0 ){
    rainGroup.children.forEach(rain =>{
    rain.position.y -=1

    if(rain.position.y <= 0 ){
      rain.position.y = Math.random() * 400
    }
  })
  }

  renderer.render(scene,camera)
  animateID = requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
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
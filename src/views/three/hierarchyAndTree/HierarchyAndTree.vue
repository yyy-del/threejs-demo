<style lang="scss" scoped>
 @import './scss';
</style>
<template>
  <div id="hierarchy-tree"></div>
</template>
<script setup lang="ts">

import * as THREE from 'three'

 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

 import { onMounted, onUnmounted } from 'vue';
 
 let scene:THREE.Scene
 let renderer:THREE.WebGLRenderer
 let camera:THREE.PerspectiveCamera
 let controls:OrbitControls
 let group:THREE.Group
 let mesh1:THREE.Mesh
 let mesh2:THREE.Mesh

 let elem:HTMLElement|null

 let timer: NodeJS.Timeout

 onMounted(()=>{
  elem = document.getElementById('hierarchy-tree')
  init()
 })
 onUnmounted(()=>{
  elem?.removeEventListener('change',render)
  destroyModel()

  // 清除定时器
  clearTimeout(timer)
 })


 function init (){

  // 获取容器元素
  if(!elem) return
  const _width = elem.clientWidth
  const _height = elem.clientHeight

  //创建场景
  scene = new THREE.Scene()

  //创建模型
  let geometry = new THREE.BoxGeometry(20, 20, 20);
  let material = new THREE.MeshLambertMaterial({color: 0x0000ff});
  //创建组

    //创建两个网格模型mesh1、mesh2
  mesh1 = new THREE.Mesh(geometry, material);
  mesh2 = new THREE.Mesh(geometry, material);
  mesh2.position.set(50,0,0);   //mesh2本地坐标系的坐标设置为（50,0,0）

  // group本地坐标设置和mesh2一样设置为(50, 0, 0)
  // mesh父对象设置position会影响得到mesh的世界坐标
  group = new THREE.Group();
  group.position.set(50,0,0)
  //把mesh1型插入到组group中，mesh1作为group的子对象
  group.add(mesh1);
  //把mesh2型插入到组group中，mesh2作为group的子对象
  group.add(mesh2);
  //把group插入到场景中作为场景子对象
  scene.add(group);
  

  //本地坐标是已自身为中心点，世界坐标是以场景为中心点？

  // .position属性获得本地坐标
   console.log('本地坐标',mesh2.position);
   
  // getWorldPosition()方法获得世界坐标
  //该语句默认在threejs渲染的过程中执行,如果渲染之前想获得世界矩阵属性、世界位置属性等属性，需要通过代码更新
  scene.updateMatrixWorld(true);
  // 声明一个三维向量用来保存世界坐标

  let worldPosition = new THREE.Vector3();
  // 执行getWorldPosition方法把模型的世界坐标保存到参数worldPosition中
  mesh2.getWorldPosition(worldPosition);

  console.log('世界坐标',worldPosition);

  // 创建光源
  //环境光
  let  ambientLight = new THREE.AmbientLight(0x404040)
  scene.add(ambientLight)

  //  创建相机
  camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,10000)
  camera.position.set(200,100,200)
  camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
  
  //创建渲染器
  renderer  = new THREE.WebGLRenderer({
    antialias:true,  // 开启抗锯齿
    alpha:true
  })
  renderer.setSize(_width,_height)
  renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
  
  //将渲染器放到容器内
  elem.appendChild(renderer.domElement)
  
  //创建轨道控制器
  controls = new OrbitControls(camera,renderer.domElement)
  controls.addEventListener('change',render)

  // 创建辅助坐标系
  const axesHelper = new THREE.AxesHelper(100)
  scene.add(axesHelper)

  //渲染
  render()   
 }

 function render() {
  renderer.render(scene,camera)
 }
 
  // 球体网格模型创建函数
 function sphereMesh(R:number, x:number, y:number, z:number) {
   let geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
   let material = new THREE.MeshPhongMaterial({
     color: 0x0000ff
   }); //材质对象Material
   let mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
   mesh.position.set(x, y, z);
   return mesh;
 }
 // 圆柱体网格模型创建函数
 function cylinderMesh(R:number, h:number, x:number, y:number, z:number) {
   let geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
   let material = new THREE.MeshPhongMaterial({
     color: 0x0000ff
   }); //材质对象Material
   let mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
   mesh.position.set(x, y, z);
   return mesh;
 }
 
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

/**
 * 创建label标签的canvas
 */
 function  makeLabelCanvas (baseWidth:number, size:number, name:string) {
  const borderSize = 2
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx)  return null
  const font = `${size}px bold sans-serif`
  ctx.font = font
  // measure how long the name will be
  const textWidth = ctx.measureText(name).width
  const doubleBorderSize = borderSize * 2
  const width = baseWidth + doubleBorderSize
  const height = size + doubleBorderSize
  ctx.canvas.width = width
  ctx.canvas.height = height
  // need to set font again after resizing canvas
  ctx.font = font
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'transparent' // 标签背景颜色
  ctx.fillRect(0, 0, width, height)
  // scale to fit but don't stretch
  const scaleFactor = Math.min(1, baseWidth / textWidth)
  ctx.translate(width / 2, height / 2)
  ctx.scale(scaleFactor, 1)
  ctx.fillStyle = 'red'
  ctx.fillText(name, 0, 0)
  return ctx.canvas
}
 // 创建定时器
 timer =  setTimeout(() => {
  //沿着Y轴平移mesh1和mesh2的父对象，mesh1和mesh2跟着平移
  // group.translateY(100);
  //父对象缩放，子对象跟着缩放
  // group.scale.set(4,4,4);
  // console.log(group)
  //父对象旋转，子对象跟着旋转
  // group.rotateY(Math.PI/6)

  //删除子对象destroyModel
  group.remove(mesh1,mesh2)



    //创建机器人
  // 头部网格模型和组
  let headMesh = sphereMesh(10, 0, 0, 0);
  headMesh.name = "脑壳"
  let leftEyeMesh = sphereMesh(1, 8, 5, 4);
  leftEyeMesh.name = "左眼"
  let rightEyeMesh = sphereMesh(1, 8, 5, -4);
  rightEyeMesh.name = "右眼"
  let headGroup = new THREE.Group();
  headGroup.name = "头部"
  headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
  // 身体网格模型和组
  let neckMesh = cylinderMesh(3, 10, 0, -15, 0);
  neckMesh.name = "脖子"
  let bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
  bodyMesh.name = "腹部"
  let leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
  leftLegMesh.name = "左腿"
  let rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
  rightLegMesh.name = "右腿"
  let legGroup = new THREE.Group();
  legGroup.name = "腿"
  legGroup.add(leftLegMesh, rightLegMesh);
  let bodyGroup = new THREE.Group();
  bodyGroup.name = "身体"
  bodyGroup.add(neckMesh, bodyMesh, legGroup);
  // 人Group
  let personGroup = new THREE.Group();
  personGroup.name = "人"
  personGroup.add(headGroup, bodyGroup)
  personGroup.translateY(50)
 
  
  //创建标签   https://wow.techbrood.com/fiddle/55158
  const baseWidth = 150
  const size = 32
  const defName = '机器人'
  const canvas = makeLabelCanvas(baseWidth, size, defName)
  if (!canvas)  return
  const texture = new THREE.CanvasTexture(canvas)
  // because our canvas is likely not a power of 2
  // in both dimensions set the filtering appropriately.
  texture.minFilter = THREE.LinearFilter
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  const labelMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true
  })
  // if units are meters then 0.01 here makes size
  // of the label into centimeters.
  const labelBaseScale = 1
  // 创建精灵模型
  const label = new THREE.Sprite(labelMaterial)

  personGroup.add(label)

  console.log(personGroup.position.y)
  // label.scale.set(200,200,200)
  label.position.y =   canvas.height * labelBaseScale;

  label.scale.x = canvas.width * labelBaseScale
  label.scale.y = canvas.height * labelBaseScale

  scene.add(personGroup);
  
   //查找方式
   scene.traverse((obj:any)=>{
  
     if (obj.type === "Group") {
       // console.log(obj.name);
     }
     if (obj.type === "Mesh") {
       // console.log(obj.material)
       // console.log('  ' + obj.name);
       obj.material.color.set(0xffff00);
     }
     if (obj.name === "左眼" || obj.name === "右眼") {
       obj.material.color.set(0x000000)
     }
     // 打印id属性
     // console.log(obj.id);
     // 打印该对象的父对象
     // console.log(obj.parent);
     // 打印该对象的子对象
     // console.log(obj.children);
     // 遍历查找scene中复合条件的子对象，并返回id对应的对象
     let idNode = scene.getObjectById ( 4 );
   
     // 遍历查找对象的子对象，返回name对应的对象（name是可以重名的，返回第一个）
     let nameNode:any = scene.getObjectByName ( "左腿" );
   
     nameNode.material.color.set(0xff0000);
  })

  render()
 }, 3000);
</script>
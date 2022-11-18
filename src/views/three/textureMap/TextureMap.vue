<style lang="scss" scoped>
 @import './scss/index.scss';
</style>
<template>
  <div id="texture-map"></div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, render } from 'vue';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene:THREE.Scene
let camera:THREE.PerspectiveCamera
let renderer:THREE.WebGLRenderer
let controls:OrbitControls


onMounted(()=>{
  init()
})

onUnmounted(()=>{
  controls.removeEventListener('change',render)
})


function init(){
   // 获取容器元素
   const elem = document.getElementById('texture-map')
   if (!elem) return
   const width = elem.clientWidth
   const height =elem.clientHeight

   /* 创建场景 */
   scene = new THREE.Scene()
   

  // 纹理贴图映射到一个矩形平面上
  let geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
  // let geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
  // let geometry = new THREE.SphereGeometry(60, 25, 25); //球体

  // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
  const textureLoader = new THREE.TextureLoader();
  const src = location.origin + '/img/sea.webp'
  textureLoader.load(src,(texture)=>{

    var material = new THREE.MeshLambertMaterial({
      // color: 0x0000ff,
      // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
      map: texture,//设置颜色贴图属性值
      side:THREE.DoubleSide
    }); //材质对象Material
    let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中


    render()
  })



  // 使用图片加载器
  let geometryBox = new THREE.BoxGeometry(40,40,40)

  const  ImageLoader = new THREE.ImageLoader();
  // load方法回调函数，按照路径加载图片，返回一个html的元素img对象
  ImageLoader.load(src, (img) => {
    // img对象作为参数，创建一个纹理对象Texture
    let texture = new THREE.Texture(img);  
    // 下次使用纹理时触发更新
    texture.needsUpdate = true;
    let material = new THREE.MeshLambertMaterial({
      map: texture, //设置纹理贴图
    });
    const mesh = new THREE.Mesh(geometryBox, material); //网格模型对象Mesh
    mesh.position.set(40,80,40)
    scene.add(mesh); //网格模型添加到场景中

    render()
  });

   let geometryBuffer = new THREE.BufferGeometry(); //声明一个空几何体对象
  //类型数组创建顶点位置position数据
   const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    80, 0, 0, //顶点2坐标
    80, 80, 0, //顶点3坐标
    0, 80, 0, //顶点4坐标
  ]);
  // 创建属性缓冲区对象
  var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
  // 设置几何体attributes属性的位置position属性
  geometryBuffer.attributes.position = attribue
  var normals = new Float32Array([
    0, 0, 1, //顶点1法向量
    0, 0, 1, //顶点2法向量
    0, 0, 1, //顶点3法向量
    0, 0, 1, //顶点4法向量
  ]);
  // 设置几何体attributes属性的位置normal属性
  geometryBuffer.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标
  // Uint16Array类型数组创建顶点索引数据
  var indexes = new Uint16Array([
    0, 1, 2, 0, 2, 3,
  ])
  // 索引数据赋值给几何体的index属性
  geometryBuffer.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
   /**纹理坐标*/
   var uvs = new Float32Array([
     0,0, //图片左下角
     1,0, //图片右下角
     1,1, //图片右上角
     0,1, //图片左上角
   ]);
   // 设置几何体attributes属性的位置normal属性
   geometryBuffer.attributes.uv = new THREE.BufferAttribute(uvs, 2); //2个为一组,表示一个顶点的纹理坐标



  // 创建环境光
  let ambientLight  = new THREE.AmbientLight(0xffffff,1)
  scene.add(ambientLight)

   /* 创建相机 */ 
   camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,0.1,10000)
   camera.position.set(210,210,210)
   camera.lookAt(scene.position)

   //创建渲染器
   renderer = new THREE.WebGLRenderer({antialias:true})
  //  renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
   
   renderer.setSize(width,height)
   elem.appendChild(renderer.domElement)


   //创建轨道控制器
   controls = new OrbitControls(camera,renderer.domElement)
   controls.addEventListener('change',render)

   render()
}

function render(){
  renderer.render(scene,camera)
}


</script>
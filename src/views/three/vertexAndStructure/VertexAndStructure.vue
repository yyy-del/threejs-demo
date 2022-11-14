<style  lang="scss" scoped>
   @import './scss/index.scss';
</style>
<template>
   <div id="vertex-structure"></div>
</template>

<script setup lang="ts">

  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  import { onMounted, onUnmounted } from 'vue';

  let scene:THREE.Scene
  let camera:THREE.Camera
  let renderer:THREE.WebGLRenderer
  let controls:OrbitControls

  onMounted(()=>{
    init()
  })
  onUnmounted(()=>{
    controls.removeEventListener('change',render)
  })


  function init(){
    //获取容器元素
    const elem = document.getElementById('vertex-structure')

    if(!elem) return
    const width = elem.clientWidth
    const height = elem.clientHeight

    //创建场景
    scene = new THREE.Scene()
    
    //创建相机
    camera = new THREE.PerspectiveCamera(60 , window.innerWidth / window.innerHeight , 1 , 10000)
    camera.position.set(200,100,200)

    camera.lookAt(0,0,0)  //设置相机看向的方向

    scene.add(camera)
    

    //创建辅助坐标
    const AxesHelper = new THREE.AxesHelper(200)
    scene.add(AxesHelper)


    //创建渲染器
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(width,height)
    elem.appendChild(renderer.domElement) //将渲染器的dom插入到容器中
      
    // let geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
    //类型数组创建顶点数据
    // const vertices = new Float32Array([
    //   0, 0, 0, //顶点1坐标
    //   50, 0, 0, //顶点2坐标
    //   0, 100, 0, //顶点3坐标
    //   0, 0, 10, //顶点4坐标
    //   0, 0, 100, //顶点5坐标
    //   50, 0, 10, //顶点6坐标
    // ]);
    // 创建属性缓冲区对象
    // let attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
  
    // 设置几何体attributes属性的位置属性
    // geometry.attributes.position = attribue;


    //类型数组创建顶点颜色color数据
    // let colors = new Float32Array([
    //   1, 0, 0, //顶点1颜色
    //   0, 1, 0, //顶点2颜色
    //   0, 0, 1, //顶点3颜色
    
    //   1, 1, 0, //顶点4颜色
    //   0, 1, 1, //顶点5颜色
    //   1, 0, 1, //顶点6颜色
    // ]);
    // 设置几何体attributes属性的颜色color属性
    // geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB

    //材质对象
    

    // 三角面(网格)渲染模式
    // let material = new THREE.MeshBasicMaterial({
    //   color: 0x0000ff, //三角面颜色
    //   // vertexColors:true,//采用顶点颜色模式
    //   side: THREE.DoubleSide //两面可见
    // });
    //   var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    //   scene.add(mesh) 
   
    //顶点模式vertexColors开启的话会采用插值计算,及两种个顶点是不用的颜色的话,会采用一个顶点到另一个顶点的渐变色


    // 点渲染模式
    // let material = new THREE.PointsMaterial({
    //   // color: 0xff0000,
    //   vertexColors:true,//使用自定义顶点颜色
    //   size: 10.0 //点对象像素尺寸
    // }); //材质对象

    // let points = new THREE.Points(geometry,material)
    // scene.add(points)

    // 线条渲染模式
    // let material=new THREE.LineBasicMaterial({
    //     // color:0xff0000 //线条颜色
    //     vertexColors:true
    // });//材质对象
    // var line=new THREE.Line(geometry,material);//线条模型对象  会自动从第一个点连线到最后一个点
    // scene.add(line);//线条对象添加到场景中   


    // 顶点索引.
    var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象

    //原始创建方法
    // //类型数组创建顶点位置position数据
    // var vertices = new Float32Array([
    //   0, 0, 0, //顶点1坐标
    //   80, 0, 0, //顶点2坐标
    //   80, 80, 0, //顶点3坐标
    
    //   0, 0, 0, //顶点4坐标   和顶点1位置相同
    //   80, 80, 0, //顶点5坐标  和顶点3位置相同
    //   0, 80, 0, //顶点6坐标
    // ]);
    // // 创建属性缓冲区对象
    // var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
    // // 设置几何体attributes属性的位置position属性
    // geometry.attributes.position = attribue
    // var normals = new Float32Array([
    //   0, 0, 1, //顶点1法向量
    //   0, 0, 1, //顶点2法向量
    //   0, 0, 1, //顶点3法向量
    
    //   0, 0, 1, //顶点4法向量
    //   0, 0, 1, //顶点5法向量
    //   0, 0, 1, //顶点6法向量
    // ]);
    // // 设置几何体attributes属性的位置normal属性
    // geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标

   
    //通过索引创建方法
    //类型数组创建顶点位置position数据
    var vertices = new Float32Array([
      0, 0, 0, //顶点1坐标
      80, 0, 0, //顶点2坐标
      80, 80, 0, //顶点3坐标
      0, 80, 0, //顶点4坐标
    ]);

    // 创建属性缓冲区对象
    var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
    // 设置几何体attributes属性的位置position属性
    geometry.attributes.position = attribue
    var normals = new Float32Array([
      0, 0, 1, //顶点1法向量
      0, 0, 1, //顶点2法向量
      0, 0, 1, //顶点3法向量
      0, 0, 1, //顶点4法向量
    ]);

    // 设置几何体attributes属性的位置normal属性
    geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标
    
    // Uint16Array类型数组创建顶点索引数据
    var indexes = new Uint16Array([
      // 0对应第1个顶点位置数据、第1个顶点法向量数据
      // 1对应第2个顶点位置数据、第2个顶点法向量数据
      // 索引值3个为一组，表示一个三角形的3个顶点
      0, 1, 2,
      0, 2, 3,
    ])
    // 索引数据赋值给几何体的index属性
    geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组


     // 三角面(网格)渲染模式
    let material = new THREE.MeshBasicMaterial({
      color: 0x0000ff, //三角面颜色
      // vertexColors:true,//采用顶点颜色模式
      side: THREE.DoubleSide //两面可见
    });
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      scene.add(mesh) 
    



    render()
  
    //创建轨道控制器
    controls = new OrbitControls(camera,renderer.domElement)
    controls.addEventListener('change',render)

  }

  function render(){
    renderer.render(scene,camera)
  }


</script>
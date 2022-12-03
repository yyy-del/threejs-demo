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
  const src = import.meta.env.IS_GITHUB ?  location.origin + '/' + import.meta.env.SPLICING + '/img/sea.webp' :location.origin  + '/img/sea.webp'
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

  //  使用材质数组贴图
  let geometryBoxtMaterialIndex = new THREE.BoxGeometry(40,40,40)

  textureLoader.load(src,(texture)=>{
        // 材质对象1
     const material_1 = new THREE.MeshPhongMaterial({
       color: 0xffff3f
     })
     const material_2 = new THREE.MeshPhongMaterial({
       map: texture
     })
   
      // 设置材质数组
     const materialArr = [material_2, material_1, material_1, material_1, material_1, material_1]; 
     // 设置数组材质对象作为网格模型材质参数
     const meshLineMaterial = new THREE.Mesh(geometryBoxtMaterialIndex, materialArr); //网格模型对象Mesh
     meshLineMaterial.position.set(0,100,0)
     scene.add(meshLineMaterial); //网格模型添加到场景中
   
     render()
  })


  
  //??
  //  let geometryBuffer = new THREE.BufferGeometry(); //声明一个空几何体对象
  // //类型数组创建顶点位置position数据
  //  const vertices = new Float32Array([
  //   0, 0, 0, //顶点1坐标
  //   80, 0, 0, //顶点2坐标
  //   80, 80, 0, //顶点3坐标
  //   0, 80, 0, //顶点4坐标
  // ]);
  // // 创建属性缓冲区对象
  // const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
  // // 设置几何体attributes属性的位置position属性
  // geometryBuffer.attributes.position = attribue
  // const normals = new Float32Array([
  //   0, 0, 1, //顶点1法向量
  //   0, 0, 1, //顶点2法向量
  //   0, 0, 1, //顶点3法向量
  //   0, 0, 1, //顶点4法向量
  // ]);
  // // 设置几何体attributes属性的位置normal属性
  // geometryBuffer.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标
  // // Uint16Array类型数组创建顶点索引数据
  // const indexes = new Uint16Array([
  //   0, 1, 2, 0, 2, 3,
  // ])
  // // 索引数据赋值给几何体的index属性
  // geometryBuffer.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
  //  /**纹理坐标*/
  //  const uvs = new Float32Array([
  //    0,0, //图片左下角
  //    1,0, //图片右下角
  //    1,1, //图片右上角
  //    0,1, //图片左上角
  //  ]);
  //  // 设置几何体attributes属性的位置normal属性
  //  geometryBuffer.attributes.uv = new THREE.BufferAttribute(uvs, 2); //2个为一组,表示一个顶点的纹理坐标

  

  // // load方法回调函数，按照路径加载图片，返回一个html的元素img对象
  // ImageLoader.load(src, (img) => {
  //   // img对象作为参数，创建一个纹理对象Texture
  //   let texture = new THREE.Texture(img);  
  //   // 下次使用纹理时触发更新
  //   texture.needsUpdate = true;
  //   let material = new THREE.MeshLambertMaterial({
  //     map: texture, //设置纹理贴图
  //   });
  //   const mesh = new THREE.Mesh(geometryBuffer, material); //网格模型对象Mesh
  //   mesh.position.set(80,80,40)
  //   scene.add(mesh); //网格模型添加到场景中

  //   render()
  // });

  // 阵列贴图
  textureLine()

  //偏移贴图
  textureOffset()
  
  //旋转贴图
  textureRotation()
  
  // 纹理动画
  textureAnimation()

  // canvas 贴图
  canvasTexture()
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


//阵列
async function textureLine(){

  const geometry = new THREE.BoxGeometry(30,40,50)
  
  const textureLoader = new THREE.TextureLoader();
  const src =import.meta.env.IS_GITHUB ?  location.origin + '/' + import.meta.env.SPLICING +  '/img/sea.webp'  : location.origin + '/img/sea.webp'

  const texture = await textureLoader.load(src);
  // 设置阵列模式   默认ClampToEdgeWrapping  RepeatWrapping：阵列  镜像阵列：MirroredRepeatWrapping
  // console.log(texture)
   
  // .wrapS和.wrapT 有三个取值
  //使用THREE.RepeatWrapping，纹理将简单地重复到无穷大。
  //THREE.ClampToEdgeWrapping是默认值，纹理中的最后一个像素将延伸到网格的边缘(默认)。
  //使用THREE.MirroredRepeatWrapping， 纹理将重复到无穷大，在每次重复时将进行镜像。

  texture.wrapS = THREE.RepeatWrapping;  //这个值定义了纹理贴图在水平方向上将如何包裹，在UV映射中对应于U。
  texture.wrapT = THREE.RepeatWrapping; //这个值定义了纹理贴图在垂直方向上将如何包裹，在UV映射中对应于V。
  // uv两个方向纹理重复数量
  texture.repeat.set(4, 2);


  var material = new THREE.MeshLambertMaterial({
    // color: 0x0000ff,
    // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//设置颜色贴图属性值
    side:THREE.DoubleSide
  }); //材质对象Material
  let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  mesh.position.set(0,0,60)
  scene.add(mesh); //网格模型添加到场景中
}

// 偏移
async function textureOffset(){

  const geometry = new THREE.BoxGeometry(50,50,50)
  const textureLoader = new THREE.TextureLoader();
  const src =import.meta.env.IS_GITHUB ?  location.origin + '/' + import.meta.env.SPLICING +'/img/sea.webp' :location.origin + '/img/sea.webp'
  const texture = await textureLoader.load(src);


  
  //设置偏移
  texture.offset = new THREE.Vector2(0.3, 0.1)  // 类似于剪切  将x 剪切掉0.3 ，y剪切掉0.1
  
  var material = new THREE.MeshLambertMaterial({
    // color: 0x0000ff,
    // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//设置颜色贴图属性值
    bumpScale:3,//设置凹凸高度，默认值1。
    side:THREE.DoubleSide
  }); //材质对象Material
  let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  mesh.position.set(0,0,120)
  scene.add(mesh); //网格模型添加到场景中
}
// 旋转  
async function textureRotation(){

  const geometry = new THREE.BoxGeometry(50,50,50)
  const textureLoader = new THREE.TextureLoader();
  const src =import.meta.env.IS_GITHUB ?  location.origin + '/' + import.meta.env.SPLICING + '/img/sea.webp' :location.origin   + '/img/sea.webp'
  const texture = await textureLoader.load(src);
  
   // 设置纹理旋转角度
  texture.rotation = Math.PI/4;
  // 设置纹理的旋转中心，默认(0,0)
  texture.center.set(0.5,0.5);
  
  var material = new THREE.MeshLambertMaterial({
    // color: 0x0000ff,
    // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//设置颜色贴图属性值
    side:THREE.DoubleSide
  }); //材质对象Material
  let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  mesh.position.set(0,0,180)
  scene.add(mesh); //网格模型添加到场景中
}

// texture动画 就是在不断渲染的同时改变贴图的偏移和旋转角度等
let textureAnm:THREE.Texture
async function textureAnimation(){

  const src =import.meta.env.IS_GITHUB ?  location.origin + '/' + import.meta.env.SPLICING +  '/img/sea.webp': location.origin + '/img/sea.webp'

    /**
    * 创建一个设置重复纹理的管道
    */
   let curve = new THREE.CatmullRomCurve3([
     new THREE.Vector3(0, 0, 120),
     new THREE.Vector3(0, 60, 140),
     new THREE.Vector3(0, 60, 160),
     new THREE.Vector3(0, 0, 180)
   ]);
   let tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.6, 50, false);
   let textureLoader = new THREE.TextureLoader();

   textureAnm = await textureLoader.load(src);
   // 设置阵列模式为 RepeatWrapping
   textureAnm.wrapS = THREE.RepeatWrapping
   textureAnm.wrapT=THREE.RepeatWrapping
   // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
   //等价texture.repeat= new THREE.Vector2(20,1)
   textureAnm.repeat.x = 20;
   let tubeMaterial = new THREE.MeshPhongMaterial({
     map: textureAnm,
     transparent: true,
   })

   const tubeMesh = new THREE.Mesh(tubeGeometry,tubeMaterial)
   scene.add(tubeMesh)
}

// canvas 贴图
async function canvasTexture(){

  // canvas 
  let canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  let ctx = canvas.getContext('2d');
  if (!ctx) return
  // 矩形区域填充背景
  ctx.fillStyle = "#ff00ff";
  ctx.fillRect(0, 0, 512, 128);
  ctx.beginPath();
  // 文字
  ctx.beginPath();
  ctx.translate(256,64);
  ctx.fillStyle = "#000000"; //文本填充颜色
  ctx.font = "bold 48px 宋体"; //字体样式设置
  ctx.textBaseline = "middle"; //文本与fillText定义的纵坐标
  ctx.textAlign = "center"; //文本居中(以fillText定义的横坐标)
  ctx.fillText('a canvas texture',0,0);

  // canvas画布对象作为CanvasTexture的参数重建一个纹理对象
  // canvas画布可以理解为一张图片
  let texture = new THREE.CanvasTexture(canvas);
  //打印纹理对象的image属性
  // console.log(texture.image);
  //矩形平面
  let geometry = new THREE.PlaneGeometry(128, 32);
  
  let material = new THREE.MeshPhongMaterial({
    map: texture, // 设置纹理贴图
    side:THREE.DoubleSide
  });
  // 创建一个矩形平面网模型，Canvas画布作为矩形网格模型的纹理贴图
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0,-80,0)
  scene.add(mesh)
}

function render(){
  renderer.render(scene,camera)

  animateID =  requestAnimationFrame(render);
  // 使用加减法可以设置不同的运动方向
  // 设置纹理偏移
  if (textureAnm )   textureAnm.offset.x -= 0.001


}

 /**
 * 销毁模型
*/
function destroyModel () {
  console.log('销毁模型')
  const elem = document.getElementById('texture-map')
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



</script>
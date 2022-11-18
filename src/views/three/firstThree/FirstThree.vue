<style>
 @import './scss/index.scss';
</style>
<template>
   <div id="firstThree"></div>
</template>
<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


  
  let scene:THREE.Scene
  let mesh:THREE.Mesh
  let geometry:THREE.BoxGeometry
  let material:THREE.MeshLambertMaterial
  let renderer:THREE.WebGLRenderer
  let camera: THREE.OrthographicCamera
  let point:THREE.PointLight  //光源
  let controls: OrbitControls
  

  let animateID:number


  onMounted(()=>{
    init()
    animate()
  })

  onUnmounted(()=>{
    controls.removeEventListener('change',render)
    //销毁模型
    destroyModel()
  })

  function init() {
    // 获取three容器
    const elem = document.getElementById('firstThree')
    
    if (!elem) return

    let width = elem.clientWidth ?? 0; //窗口宽度
    let height = elem.clientHeight ?? 0 //窗口高度
    /**
     * 创建场景对象Scene
     */
    scene = new THREE.Scene();

    /**
     * 创建网格模型
     */
    // let geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    
    console.log(geometry)

    
    material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,

    }); //材质对象Material
    mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.castShadow = true //模型在方向光光照下是否显示阴影
    mesh.receiveShadow = true //模型接受投影
    scene.add(mesh); //网格模型添加到场景中



    // 创建一个平面作为集合体阴影的投影面
    let planeGeometry = new THREE.PlaneGeometry(6000,6000)
    let planeMaterial = new THREE.MeshLambertMaterial({
      color:0x999999,
      side: THREE.DoubleSide
    })
    // 平面网格模型作为投影面
    let planeMesh = new THREE.Mesh(planeGeometry,planeMaterial)
    planeMesh.rotateX(Math.PI / 2)
    planeMesh.position.y = -50 

    //设置接收阴影的投影面
    planeMesh.receiveShadow = true

    scene.add(planeMesh) //将投影面添加到场景中




    /**
     * 光源设置
     */
    //点光源
    point = new THREE.PointLight(0xffffff,1);
    point.position.set(0, 220, 0); //点光源位置
   


    // 设置用于计算阴影的光源对象
    point.castShadow = true;
    // 设置计算阴影的区域，最好刚好紧密包围在对象周围
    // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
    point.shadow.camera.near = 0.5;
    point.shadow.camera.far = 500;   //光照范围

   // 设置mapSize属性可以使阴影更清晰，不那么模糊
   point.shadow.mapSize.set(1024,1024)
   scene.add(point); //点光源添加到场景中
    //环境光
    let ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    // const AxesHelper = new THREE.AxesHelper(600)
    // scene.add(AxesHelper)
    /**
     * 相机设置
     */
 
    let k = window.innerWidth / window.innerHeight; //窗口宽高比
    let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
   
    //Create a helper for the shadow camera (optional)
    let helper = new THREE.CameraHelper( point.shadow.camera );
    scene.add( helper )
   

    /**
     * 创建渲染器对象
     */
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    renderer.shadowMap.enabled = true  //渲染器开启展示阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    elem.appendChild(renderer.domElement); //three容器中插入canvas对象

    //渲染
    render()


     //创建控制器对象
     controls = new OrbitControls(camera,renderer.domElement)

    //添加监听函数
     controls.addEventListener('change',render)
  }

  let T0 = new Date().getTime();//上次时间

  function animate() {
    let T1 = new Date().getTime();//本次时间
    let t = T1 - T0;//时间差
    T0 = T1;//把本次时间赋值给上次时间
    animateID =    requestAnimationFrame(animate);
    render()
    mesh.rotateY(0.001*t); // 旋转角速度0.001弧度每毫秒
  }
  function render(){    
    renderer.render(scene,camera); // 执行渲染操作
  }



  /**
 * 销毁模型
*/
function destroyModel () {
  console.log('销毁模型')
  const elem = document.getElementById('firstThree')
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

   setTimeout(()=>{
    // 立方体网格模型
    let geometry1 = new THREE.BoxGeometry(100, 100, 100);
    let material1 = new THREE.MeshPhongMaterial({   //反光效果材质MeshPhongMaterial
      color: 0x0000ff,
      specular:0x4488ee,
      shininess:12    
    }); //材质对象Material
    let mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
    mesh1.position.set(-120,0,0)
    mesh1.castShadow= true //模型有阴影


    scene.add(mesh1); //网格模型添加到场景中
    
    // 球体网格模型
    let geometry2 = new THREE.SphereGeometry(20, 32, 40);
    let material2 = new THREE.MeshLambertMaterial({
      color: 0xff00ff,
      opacity:0.3,                   //opacity 和transparent：true一起使用制造透明效果
      transparent:true  
    });
    let mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
    mesh2.translateY(120); //球体网格模型沿Y轴正方向平移120
    mesh2.castShadow= true //模型有阴影
    scene.add(mesh2);
    
    // 圆柱网格模型
    let geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
    let material3 = new THREE.MeshLambertMaterial({
      color:0xff00ff,
    });
    let mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
    // mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
    mesh3.position.set(120,0,0);//设置mesh3模型对象的xyz坐标为120,0,0
    mesh3.castShadow= true //模型有阴影
    scene.add(mesh3); //
   },3000)
  
</script>
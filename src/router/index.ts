 import { createRouter ,createWebHistory,RouteRecordRaw } from 'vue-router'
 // 还有 createWebHashHistory 和 createMemoryHistory

 const routes:RouteRecordRaw[] = [
  {
   path:'/',
   redirect:'/home'
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('@/views/home/home.vue'),
    children:[
      {
        path:'/home',
        redirect:'/three/pcdLoad'
      },
      {
        path:'/three/pcdLoad',
        name:'pcdLoad',
        component:()=>import('@/views/three/pcd/pcdLoad.vue')
      } ,
       //匹配所有404
      { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: ()=>import('@/views/NotFound/NotFound.vue')
      },
    ]
  },

]

 const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})


export default router
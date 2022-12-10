<script setup lang="ts">


import { computed ,ref} from 'vue';
import { useRouter } from 'vue-router';

import { toggleDark,setTheme } from '@/utils'

import {
  Sunny,
  Moon
} from '@element-plus/icons-vue'


let isDark= ref(false)
let router = useRouter()

const currentPath  = computed(()=>  router.currentRoute.value.path)
const toggleDarkTheme = ()=>{
  isDark.value = toggleDark()
}
const changeTheme  =(type:string)=>{
  switch (type) {
    case  'primary':
    setTheme({primary:'#CCFF00'}) 
      break;
  
    case  'success':
    setTheme({success:'#99CC00'}) 
      break;
  
    case  'info':
    setTheme({info:'#006600'}) 
      break;
  
    case  'warning':
    setTheme({warning:'#330066'}) 
      break;
  
    case  'danger':
    setTheme({danger:'#660033'}) 
      break;
  
    default:
      break;
  }
     
}


</script>

<template>
      <div class="common-layout">
       <el-container class="el-container">
         <el-aside width="200px"> 
             <div class="title">
                <img src="~@/assets/vue.svg"/>
             </div>
             <el-menu
               :default-active="currentPath"
               class="el-menu-vertical-demo"
               router
             >
               <el-sub-menu index="/three">
                 <template #title>
                   <i class="iconfont icon-3d menu-icon"></i>
                   <span>THREE</span>
                 </template>
                 <el-menu-item-group>
                   <el-menu-item index="/three/pcdLoad" >pcdLoad</el-menu-item>
                   <el-menu-item index="/three/firstThree">firstThree</el-menu-item>
                   <el-menu-item index="/three/vertexAndStructure">顶点和结构</el-menu-item>
                   <el-menu-item index="/three/hierarchyAndTree">Group和数结构</el-menu-item>
                   <el-menu-item index="/three/textureMap">纹理贴图</el-menu-item>
                   <el-menu-item index="/three/camera">相机</el-menu-item>
                   <el-menu-item index="/three/sprite">精灵模型</el-menu-item>
                   <el-menu-item index="/three/animation">动画模块</el-menu-item>
                   <el-menu-item index="/three/bonesAnimation">骨骼动画</el-menu-item>
                 </el-menu-item-group>
               </el-sub-menu>
             </el-menu>
         </el-aside>
         <el-container>

           <el-header class="header"> 
             <el-button type="primary" @click="changeTheme('primary')">primary</el-button>
             <el-button type="success" @click="changeTheme('success')">success</el-button>
             <el-button type="info" @click="changeTheme('info')">info</el-button>
             <el-button type="warning" @click="changeTheme('warning')">warning</el-button>
             <el-button type="danger" @click="changeTheme('danger')">danger</el-button>
          
             <el-icon  @click="toggleDarkTheme">
                <Sunny v-if="!isDark" />
                <Moon v-else/>
             </el-icon> 
 
           </el-header>

           <el-main class="el-main">
             <RouterView/>
           </el-main>
         </el-container>
       </el-container>
      </div>

</template>

<style lang="scss" scoped>
.common-layout{
  width: 100vw;
  height: 100vh;
  .el-container{
    width: 100%;
    height: 100%;
    .title{
      text-align: center;
    }
    .menu-icon{
      margin-right: 4px;
    }
  }
  .el-main{
    position: relative;
    --el-main-padding: 2px;
    background-color:#fff;
  }

  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

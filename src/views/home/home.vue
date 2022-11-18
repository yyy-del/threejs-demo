<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter()

const currentPath  = computed(()=>  router.currentRoute.value.path)


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
                 </el-menu-item-group>
               </el-sub-menu>
             </el-menu>
         </el-aside>
         <el-container>
           <el-header>Header</el-header>
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
    --el-main-padding: 2px;
    background-color:$--home-background-color;
  }
}
</style>

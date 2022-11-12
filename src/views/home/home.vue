<script setup lang="ts">


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
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
               default-active="/three/pcdLoad"
               class="el-menu-vertical-demo"
               router
               @open="handleOpen"
               @close="handleClose"
             >
               <el-sub-menu index="1">
                 <template #title>
                   <i class="iconfont icon-3d menu-icon"></i>
                   <span>THREE</span>
                 </template>
                 <el-menu-item-group>
                   <el-menu-item index="/three/pcdLoad" >pcdLoad</el-menu-item>
                   <el-menu-item index="1-2">item two</el-menu-item>
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

<style lang="scss" scoped>
  @import './scss/index.scss';
</style>
<template>
   <div class="pcdLoad">
     <ThreePCD :pcdSrc='pcdSrc'/>
   </div>
</template>
<script setup lang="ts">
 import ThreePCD from '@/components/ThreePCD/ThreePCD.vue'

//  const pcdSrc = location.origin + '/model/pcd/model1.pcd'
 const pcdSrc = location.origin + '/model/pcd/Zaghetto.pcd'
</script>

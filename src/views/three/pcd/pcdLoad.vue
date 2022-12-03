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
 const pcdSrc =   import.meta.env.IS_GITHUB ?  location.origin + '/' + import.meta.env.SPLICING  + '/model/pcd/Zaghetto.pcd':    location.origin + '/model/pcd/Zaghetto.pcd'
</script>

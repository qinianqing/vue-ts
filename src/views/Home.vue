<template>
  <div class="layout">
    <Layout>
      <AppHeader></AppHeader>
      <Left></Left>
      <router-view/>
    </Layout>  
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppHeader from "./Header.vue";
import Left from "./Left.vue";
@Component({
  components: { AppHeader, Left }
})
export default class Home extends Vue {}
</script>
<style scoped lang="less" rel="stylesheet/less">
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.ivu-layout{
  height: 100%;
}
</style>

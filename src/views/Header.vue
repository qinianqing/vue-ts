<template>
          <Header>
              <Menu mode="horizontal" theme="dark" active-name="1">
                  <div class="layout-logo"></div>
                  <div class="layout-nav"></div>
              </Menu>
          </Header>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
@Component({})
export default class AppHeader extends Vue {}
</script>
<style scoped lang="less" rel="stylesheet/less">
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
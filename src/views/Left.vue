<template>
  <Layout>
    <Sider hide-trigger :style="{background: '#fff'}">
      <Menu
        :active-name="menuList[0].children[0].id"
        theme="light"
        width="auto"
        :open-names="[menuList[0].id]"
        v-for="(item,index) in menuList"
        :key="index"
      >
        <Submenu :name="item.id">
          <template slot="title">
            <Icon :type="item.type"></Icon>
            {{item.title}}
          </template>
          <div v-if="item.children && item.children.length > 0">
            <div v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex">
              <MenuItem :name="childrenItem.id">{{childrenItem.title}}</MenuItem>
            </div>
          </div>
        </Submenu>
      </Menu>
    </Sider>
  </Layout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Left extends Vue {
  private menuList = [
    {
      id: "rr",
      title: "系统管理",
      type: "ios-navigate",
      children: [
        {
          id: "x4x",
          title: "用户管理"
        },
        {
          id: "xxa",
          title: "角色管理"
        },
        {
          id: "xxs",
          title: "权限管理"
        }
      ]
    },
    {
      id: "2",
      title: "商品展示",
      type: "ios-keypad",
      children: []
    }
  ];
}
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
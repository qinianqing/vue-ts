import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// 动态加载路由
function load(component: string): any {
  return () => import(`@/views/${component}.vue`);
}

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: load('Home'),
  },
  {
    path: '/about',
    name: 'About',
    component: load('About'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

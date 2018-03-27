import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 通过代码分割来确保各个js独立开
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: ()=>import('../components/Home.vue'),
      meta:{keepAlive:true}
     },
    {
      path: '/add',
      component: ()=>import('../components/Add.vue'),
    },
    {
      path: '/collection',
      component: ()=>import('../components/Collection.vue')
    },
    {
      path: '/list',
      component: ()=>import('../components/List.vue'),
    },
    // 路径参数 /detail/1  {bid:1}要求必须有，可以随机
    {
      path: '/detail/:bid',
      component: ()=>import('../components/Detail.vue'),
      name:'detail'
    },
    {
      path: '/*',
      redirect: '/home'
    },
  ]
})

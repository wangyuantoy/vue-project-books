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
      meta:{keepAlive:true,title:'首页'}
     },
    {
      path: '/add',
      component: ()=>import('../components/Add.vue'),
      meta:{title:'添加'}
    },
    {
      path: '/collection',
      component: ()=>import('../components/Collection.vue'),
      meta:{title:'收藏'}
    },
    {
      path: '/list',
      component: ()=>import('../components/List.vue'),
      meta:{title:'列表'}
    },
    // 路径参数 /detail/1  {bid:1}要求必须有，可以随机
    {
      path: '/detail/:bid',
      component: ()=>import('../components/Detail.vue'),
      meta:{title:'详情'},
      name:'detail'
    },
    {
      path: '/*',
      redirect: '/home'
    },
  ]
})

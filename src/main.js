// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;
import VueAwesomeSwiper from 'vue-awesome-swiper'; // 导入swiper
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper); // 使用swiper
/* eslint-disable no-new */
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title;
  next()
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

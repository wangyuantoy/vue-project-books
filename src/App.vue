<template>
  <div id="app">
    <!--需要缓存的页面-->
    <transition name="fadeIn">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <!--不需要缓存的页面-->
    <transition name="fadeIn">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from './base/Tab.vue';
export default {
  name: 'App',
  components:{
    Tab
  }
}
</script>

<style>
  *{ padding: 0; margin: 0;}
  ol,ul,li {list-style:none; }
  h1,h2,h3,h4,h5,h6,button,input,select,textarea {font-weight: normal;}
  button::-moz-focus-inner,input::-moz-focus-inner{padding:0; border:0;}
  i, cite, em, var, dfn, address {font-style: normal;}
  .clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; font-size:0;}
  .clearfix{zoom:1;clear:both;}
  a{text-decoration: none;}
  body{font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif;background: #f1f1f1;font-size:12px;color:#333;}
  img{display: block;width: 100%; border: 0;}
  html, body{
    width: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    height: 100%;
  }
  body {
    min-width: 320px;
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }

  select{
    border: none;
    background-color: transparent;
    outline: none;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
  }
  select::-ms-expand { display: none; }
  .content{
    position: fixed;
    width: 100%;
    top: 40px;
    bottom: 50px;
    overflow: auto;
  }
  .fadeIn-enter{
    opacity: 0;
  }
  .fadeIn-enter-active{
    transition: all 0.3s linear;
  }
  .fadeIn-leave-active{
    transition: all 0.3s linear;
    opacity: 0;
  }
</style>

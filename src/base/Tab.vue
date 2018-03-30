<template>
    <div class="footer">
      <router-link to="/home">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>
      <router-link to="/list">
        <i class="iconfont icon-liebiao"></i>
        <span>列表</span>
      </router-link>
      <router-link to="/collection">
        <i class="iconfont icon-shoucang"></i>
        <span>购物车</span>
      </router-link>
      <router-link to="/add">
        <i class="iconfont icon-icon--"></i>
        <span>添加</span>
      </router-link>
    </div>
</template>

<style scoped lang="less">
.footer{
  height: 48px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  border-top:1px solid #ccc;
  a{
    color: yellowgreen;
    display: flex;
    flex-direction: column;
    flex:1;
    align-items: center;
    justify-content: center;
  }
  a.router-link-active{
    color: red;
  }
}
</style>

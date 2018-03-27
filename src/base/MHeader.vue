<template>
    <div class="header">
      <slot></slot>
      <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
    </div>
</template>

<script>
    export default {
        props:{
          back:{
            type:Boolean,
            default:false
          }
        },
        data(){
            return {msg: ""}
        },
        created(){
        },
        methods: {
          goBack(){
            this.$router.go(-1)
          }
        },
        computed: {},
        components: {}
    }
</script>

<style scoped lang="less">
.header{
  background-color: #afd9ee;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  font-weight:bold;
  position:fixed;
  top:0;
  left: 0;
  width:100%;
  i{
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
}
</style>

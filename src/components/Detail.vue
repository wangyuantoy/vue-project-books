<template>
  <div class="detail">
    <MHeader :back="true">详情</MHeader>
    <ul>
      <li>
        <label for="bookCover">书的封面</label>
        <input type="text" v-model="book.bookCover" id="bookCover">
      </li>
      <li>
        <label for="bookName">书的名字</label>
        <input type="text" v-model="book.bookName" id="bookName">
       </li>
      <li>
        <label for="bookInfo">书的信息</label>
        <input type="text" v-model="book.bookInfo" id="bookInfo">
      </li>
      <li>
        <label for="bookPrice">书的价格</label>
        <input type="text" v-model.number="book.bookPrice" id="bookPrice">
      </li>
      <button @click="update">确认修改</button>
    </ul>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue';
  import { findOneBook,updateBook } from '../api';

  export default {
    data(){
      return {book:{}}
    },
    watch:{
      $route(){ // 只要路径变化 重新获取数据
        this.getData();
      }
    },
    created(){
      this.getData();
    },
    methods: {
      async getData(){
        this.book = await findOneBook(this.bid);
        // 如果返回一个空对象 需要跳转回列表页
        Object.keys(this.book).length > 0 ? void 0:this.$router.push('./list');
      },
      async update(){ // 点击修改图书信息
        await updateBook(this.bid,this.book);
        this.$router.push('/list')
      }
    },
    computed: {
      bid(){
        return this.$route.params.bid; //将路径参数的bid映射到比对上
      }
    },
    components: {
      MHeader
    }
  }
</script>

<style scoped lang="less">
.detail{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background-color: #fff;
}
  ul{
    margin: 50px 20px 0 20px ;
    li{
      label{
        display: block;
        font-size: 24px;
      }
      input{
        margin: 10px 0;
        height: 24px;
        width: 100%;
      }
    }
    button{
      display: block;
      width: 80px;
      height: 25px;
      background-color: #2aabd2;
      border: none;
      border-radius: 2px;
      outline: none;
    };
  }
</style>

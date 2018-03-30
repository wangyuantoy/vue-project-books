<template>
  <div>
    <MHeader>列表页</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <ul>
        <router-link v-for="(book,index) in books" :key="index" tag="li" :to="{name:'detail',params:{bid:book.bookId}}">
          <img :src="book.bookCover">
          <div>
            <h2>{{ book.bookName }}</h2>
            <p>{{ book.bookInfo }}</p>
            <p>{{ book.bookPrice }}</p>
            <div class="but-list">
              <button @click.stop="remove(book.bookId)">删除</button>
              <button @click.stop="add(book.bookId)">加购物车</button>
            </div>

          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>


<script>
  import MHeader from '../base/MHeader.vue';
  import {pagination, removeBooks, addCart} from '../api';

  export default {
    data() {
      // offset 偏移量  hasMore是否有更多
      return {books: [], offset: 0, hasMore: true, isLoading: false}
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        if (!this.hasMore || this.isLoading) return;
        this.isLoading = true;
        let {books, hasMore} = await pagination(this.offset);
        this.books = [...this.books, ...books]; // 获取的新书添加到老书数组中
        this.hasMore = hasMore;
        this.isLoading = false;
        this.offset = this.books.length; // 偏移量是目前所有图书的总数
      },
      async remove(id) {
        await removeBooks(id); //调用接口删除后台数据
        this.books = this.books.filter(item => item.bookId !== id) //删除前端数据
      },
      async add(id){
        await addCart(id)
      },
      loadMore(){
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(()=>{  // 事件节流
          let {scrollTop,clientHeight,scrollHeight} = this.$refs.scroll;
          if(scrollTop+clientHeight+20>scrollHeight){
            this.getData();
          }
        },13)
      }
    },
    computed: {},
    components: {
      MHeader
    }
  }
</script>

<style scoped lang="less">
  .content ul {
    padding: 10px;
    li {
      display: flex;
      height: 120px;
      margin-top: 10px;
      img {
        flex: 1;
        width: 102px;
      }
      div {
        flex: 2;
        padding: 5px 0 0 20px;
        h2 {
          margin-top: 5px;
          font-size: 16px;
          color: #333;
          font-weight: bold;
        }
        p {
          margin-top: 5px;
          font-size: 12px;
        }
        p:nth-child(3) {
          color: red;
          font-weight: bold;
          font-size: 14px;
        }
        .but-list{
          display: flex;
          justify-content: flex-end;
        }
        button {
          display: block;
          width: 60px;
          height: 25px;
          margin-right: 20px;
          background-color: orangered;
          border: none;
          border-radius: 15px;
          outline: none;
        }
      }
    }
  }
</style>

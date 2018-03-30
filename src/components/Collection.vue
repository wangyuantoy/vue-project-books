<template>
  <div>
    <MHeader>购物车</MHeader>
    <div class="content">
      <ul>
        <router-link v-for="(book,index) in books" :key="index" tag="li" :to="{name:'detail',params:{bid:book.bookId}}">
          <img :src="book.bookCover">
          <div>
            <h2>{{ book.bookName }}</h2>
            <p>{{ book.bookInfo }}</p>
            <p>{{ book.bookPrice }}</p>
          </div>
        </router-link>
      </ul>
      <div>
        总计：
        <span>{{total}}</span>
        <span>立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue';
  import {getCart} from '../api';

  export default {
    data() {
      return {books: [], total: ''}
    },
    created() {
      this.getCartData()
    },
    methods: {
      async getCartData() {
        let {result, total} = await getCart();
        this.books = result;
        this.total = total;
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
      }
    }
  }
</style>

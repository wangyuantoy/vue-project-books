let http = require('http');
let fs = require('fs');
let url = require('url');

let sliders = require('./sliders');
let pageSize = 5; //每页显示5个
let cartBooks = [];
function read(cb) {
  fs.readFile('./book.json', 'utf8', function (err, data) {
    if (err || data.length === 0) {
      cb([])
    } else {
      cb(JSON.parse(data));
    }
  })
}

function write(data, cb) {
  fs.writeFile('./book.json', JSON.stringify(data), cb)
}

http.createServer((req, res) => {
  // 发布代码时取消一下跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1');
  // 发布代码时取消以上
  if (req.method === "OPTIONS") return res.end();
  /*让options请求快速返回*/

  let {pathname, query} = url.parse(req.url, true); // true把query转化为对象
  // 获取轮播数据接口   /sliders
  if (pathname === '/sliders') {
    res.setHeader("Content-Type", "application/json;charset=utf8");
    return res.end(JSON.stringify(sliders))
  }
  // 热门图书
  if (pathname === '/hot') {
    read(function (books) {
      // 一次返回6本最新的
      let hot = books.reverse().slice(0, 6);
      res.end(JSON.stringify(hot));
    });
    return
  }
  // 对书的增删改查
  if (pathname === '/book') {
    let id = parseInt(query.id); //取出的是字符串=>数字
    switch (req.method) { //
      case 'GET':
        if (!isNaN(id)) { // 返回指定id的书
          read(function (books) {
            let book = books.find(item => item.bookId === id);
            if (!book) book = {};
            res.setHeader("Content-Type", "application/json;charset=utf8");
            res.end(JSON.stringify(book))
          })
        } else { // 返回所有
          read(function (books) {
            res.setHeader("Content-Type", "application/json;charset=utf8");
            res.end(JSON.stringify(books.reverse()))
          })
        }
        break;
      case 'POST':
        let str = '';
        req.on("data", chunk => {
          str += chunk;
        });
        req.on('end', () => {
          let book = JSON.parse(str); // 修改后的book
          read(function (books) {
            book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;
            books.push(book);
            write(books, function () {//保存数据
              res.end(JSON.stringify(book)) // 可以返回任何数据，前端不会看
            })
          })
        });
        break;
      case 'PUT':
        if (!isNaN(id)) {
          let str = '';
          req.on("data", chunk => {
            str += chunk;
          });
          req.on('end', () => {
            let book = JSON.parse(str); // 修改后的book
            read(function (books) {
              books = books.map(item => {
                if (item.bookId === id) { // id相同的那本返回请求体中修改过的
                  return book
                }
                //   if(item.bookId%2 === 0){
                //     let book = JSON.parse(str);
                //     (function (item) {
                //       book.bookId = item.bookId;
                //     })(item);
                //     return book;
                //   }
                return item
              });
              write(books, function () {//保存数据
                res.end(JSON.stringify(book)) // 可以返回任何数据，前端不会看
              })
            })
          })
        }
        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(item => item.bookId !== id);
          write(books, function () {
            res.end(JSON.stringify({}))  // 删除返回空对象
          })
        });
        break;
    }
    return
  }
  if (pathname === '/page') {
    let offset = parseInt(query.offset) || 0;
    read(function (books) {
      let result = books.reverse().slice(offset, offset + pageSize);
      let hasMore = true;
      if (books.length <= offset + pageSize) {
        hasMore = false;
      }
      res.setHeader("Content-Type", "application/json;charset=utf8");
      res.end(JSON.stringify({books: result, hasMore}))
    });
    return
  }
  // 添加购物车
  if(pathname === '/addcart'){
    let id = parseInt(query.id);
    cartBooks.push(id);
    res.end(JSON.stringify({}))
  }
  // 初始化购物车数据
  if(pathname === '/getCart'){
    let total = 0;
    read(function (books) {
      let result = books.filter(item=>{
        if(cartBooks.includes(item.bookId)){
          total+=Number(item.bookPrice);
          return true
        }
        return false
      });
      res.setHeader("Content-Type","application/json;charset=utf8");
      res.end(JSON.stringify({result,total}))
    })
  }

}).listen(8000);


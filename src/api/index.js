import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'; // 增加默认请求路径
axios.interceptors.response.use((res)=>{ return res.data }); // 统一拦截结果，把结果处理成res.data
//获取轮播数据
export  let getSliders = () => {
  // 返回promise对象
  return axios.get('/sliders')
};
// 获取热门图书
export let getHotBook = () => {
  return axios.get('/hot')
};
// 获取所有图书
export let getBooks =()=>{
  return axios.get('/book')
};
// 删除某一本图书
export let removeBooks =(id)=>{
  return axios.delete(`/book?id=${id}`)
};

// 获取某一本图书
export let findOneBook =(id)=>{
  return axios.get(`/book?id=${id}`)
};

//修改图书
/**
 * @param id  图书id
 * @param data  数据 请求体发送
 * @returns {AxiosPromise<any>}
 */
export let updateBook =(id,data)=>{
  return axios.put(`/book?id=${id}`,data)
};
// 添加图书
export let addBook =(data)=>{
  return axios.post(`/book`,data)
};

export let getAll = ()=> {
  return axios.all([getSliders(),getHotBook()])
};
// 分页加载
export let pagination = (offset)=> {
  return axios.get(`/page?offset=${offset}`)
};
// 添加购物车
export let addCart = (id)=> {
  return axios.get(`/addcart?id=${id}`)
};
// 获取购物车数据
export let getCart = (id)=> {
  return axios.get('/getCart')
};

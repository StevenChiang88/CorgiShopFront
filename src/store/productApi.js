import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const productApi = createApi({
  reducerPath: "productApi", //Api的名稱，不能重複
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nrnrut.deta.dev/",
  }), //發送請求使用的工具
  endpoints(build) {
    // endpoints 用來指定Api中的功能，是一個函式，需要一個物件作為return
    return {
      //前面是命名，後面是透過build來設定請求
      getProducts: build.query({
        query() {
          //query設定請求的子路徑
          return "product";
        },
      }),
      getProductByCategory: build.query({
        query(cat) {
          //query設定請求的子路徑
          return `product?categories=${cat}`;
        }, //query查詢
      }),
      getProductById: build.query({
        query(id) {
          //query設定請求的子路徑
          return `product/find/${id}`;
        }, //query查詢
      }),
    };
  },
});

//Api創建後，會自動生成hook，再將他export

export const {
  useGetProductsQuery,
  useGetProductByCategoryQuery,
  useGetProductByIdQuery,
} = productApi;

//將這個Api export出store的index.js
export default productApi;

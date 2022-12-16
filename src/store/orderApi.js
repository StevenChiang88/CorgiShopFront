import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const orderApi = createApi({
  reducerPath: "orderApi", //Api的名稱，不能重複
  baseQuery: fetchBaseQuery({

    baseUrl: "https://corgishopserver.onrender.com/",

    prepareHeaders: (headers, { getState }) => {
      //先獲得用戶token (用LocalStorage的Token不好，怕會過期)，
      //應該要用redux內的token，但是這邊調用不了useSelector
      //所以解構prepareHeaders，拿到getState

      const token = getState().auth.token;
      //因為原先headers就有預設，所以不能覆蓋掉，就要在原來headers再加入新的
      if (token) {
        headers.set("token", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(build) {
    return {
      getOrdersByUserId: build.query({
        query(userId) {
          //query設定請求的子路徑
          return `order/find/${userId}`;
        },
      }),

      addOrder: build.mutation({
        query(orderInfo) {
          return {
            url: "order",
            method: "post",
            body: orderInfo,
          };
        },
      }),
    };
  },
});

export const { useGetOrdersByUserIdQuery, useAddOrderMutation } = orderApi;

//將這個Api export出store的index.js
export default orderApi;

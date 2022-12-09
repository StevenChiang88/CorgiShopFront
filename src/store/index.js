import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authApi from "./authApi";
import orderApi from "./orderApi";
import productApi from "./productApi";
import { authSlice } from "./reducer/authSlice";
import { cartSlice } from "./reducer/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(orderApi.middleware)
      .concat(authApi.middleware), //將Api加入
});

export default store;

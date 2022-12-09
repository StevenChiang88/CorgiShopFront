import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      //state.quantity是購物車品項數，非購物車總物品數
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.product.price * action.payload.quantity;
    },
    removeToCart: (state, action) => {
      //state.quantity是購物車品項數，非購物車總物品數
      state.quantity -= 1;
      state.products = action.payload.newProducts;
      state.total -= action.payload.newTotal;
    },
    updateCartQuantity: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
    },
  },
});
export const { addToCart, removeToCart, updateCartQuantity } =
  cartSlice.actions;

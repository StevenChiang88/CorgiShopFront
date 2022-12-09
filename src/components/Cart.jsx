import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToCart } from "../store/reducer/cartSlice";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = ({ setCartShow }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartDeleteHandler = (item) => {
    const X = cart.products.filter((product) => product.uuid !== item.uuid);
    const Y = cart.products.filter((product) => product.uuid == item.uuid);
    const removedItemPrice = Y[0].quantity * Y[0].product.price;

    dispatch(removeToCart({ newProducts: X, newTotal: removedItemPrice }));
  };
  return (
    <Box className="absolute top-[3rem] -right-8 bg-slate-100">
      <Box className="w-[350px] lg:w-[400px] h-[300px] overflow-y-auto justify-center items-center relative">
        {cart.total === 0 ? (
          <p className="absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4">
            購物車內空無一物
          </p>
        ) : null}
        {cart.products.map((item) => (
          <div
            key={item.uuid}
            className="flex w-full h-[100px] shadow text-xs  "
          >
            <div className="flex-[2] flex items-center justify-center">
              <img
                className=" h-3/5 object-cover"
                about="照片"
                src={item.product.img}
              />
            </div>

            <div className="flex-[3] flex justify-center flex-col ">
              <h1>{item.product.title}</h1>
            </div>
            <div className="flex-1 flex justify-center flex-col ">
              <h1>*{item.quantity}</h1>
            </div>
            <div className="flex-[2] flex justify-center  flex-col">
              <h1>NT$ {item.product.price * item.quantity}</h1>
            </div>
            <div className="flex-1 flex justify-center items-center ">
              <FontAwesomeIcon
                className="cursor-pointer text-xl mr-2"
                onClick={() => {
                  cartDeleteHandler(item);
                }}
                icon={faTrash}
              />
            </div>
          </div>
        ))}
      </Box>
      <div className="w-full bg-slate-500 text-white text-sm p-4  flex  items-center justify-around">
        <div>
          <p>Totoal:</p>
          <p>NT$ {cart.total.toLocaleString()}</p>
        </div>
        <button
          className="bg-gray-400 px-4 py-2 rounded-md"
          onClick={() => {
            setCartShow(false);
          }}
        >
          返回購物
        </button>
        <button
          onClick={() => {
            setCartShow(false);
            navigate("/checkout");
          }}
          className="text-gray-400 bg-white px-4 py-2 rounded-md"
        >
          前往購物清單
        </button>
      </div>
    </Box>
  );
};

export default Cart;

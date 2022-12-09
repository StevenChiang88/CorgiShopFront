import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../store/productApi";
import { addToCart } from "../store/reducer/cartSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import CouponBanner from "../components/CouponBanner";
const Product = () => {
  const { id } = useParams();
  const { data, isSuccess } = useGetProductByIdQuery(id);

  const [quantity, setQuantity] = useState(1);
  const counterHandler = (method) => {
    let x = quantity;
    if (method == "plus") {
      x++;
      setQuantity(x);
    } else {
      if (quantity === 1) {
        setQuantity(x);
      } else {
        x--;
        setQuantity(x);
      }
    }
  };

  const dispatch = useDispatch();
  const addProduct = () => {
    const x = uuidv4();
    dispatch(addToCart({ product: data, quantity, uuid: x }));
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh_-_11rem)]">
      <CouponBanner />
      <hr
        style={{ width: "80%", border: "1px solid #DDDDDD", marginTop: "2rem" }}
      />

      {isSuccess ? (
        <div className="w-full flex items-center justify-center flex-col">
          <div className="w-4/5 flex flex-col md:flex-row items-center p-8  ">
            <div className="w-full md:w-2/5">
              <img className="w-[400px]" alt={data.title} src={data.img} />
            </div>
            <div className="flex w-full md:w-3/5 justify-center flex-col gap-4 p-4 text-xl whitespace-pre-wrap">
              <h1 className="text-left">{data.title}</h1>
              <h1>{data.desc}</h1>
              <h1 className=" text-3xl text-center">NT$ {data.price}</h1>
              <div className="flex gap-4 items-center justify-center text-xl">
                <FontAwesomeIcon
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onClick={() => {
                    counterHandler("minus");
                  }}
                  icon={faMinus}
                />
                <p className="text-2xl"> {quantity}</p>
                <FontAwesomeIcon
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onClick={() => {
                    counterHandler("plus");
                  }}
                  icon={faPlus}
                />
              </div>
              <button
                onClick={() => {
                  addProduct();
                }}
                className="bg-zinc-700 text-white pt-2 pb-2 pr-4 pl-4 hover:bg-slate-500 duration-500 "
              >
                加入購物車
              </button>
            </div>
          </div>
          <hr style={{ width: "80%", border: "1px solid #DDDDDD" }} />
        </div>
      ) : (
        <ChakraProvider>
          <Spinner size="xl" speed="0.65s" />
        </ChakraProvider>
      )}
    </div>
  );
};

export default Product;

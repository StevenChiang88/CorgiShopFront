import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import {
  faCartShopping,
  faHeart,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/reducer/cartSlice";

const Product = ({ item }) => {
  const dispatch = useDispatch();

  const addProduct = () => {
    const x = uuidv4();
    dispatch(addToCart({ product: item, quantity: 1, uuid: x }));
  };

  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setShowMessage(true);
      }}
      onMouseLeave={() => {
        setShowMessage(false);
      }}
      style={{
        position: "relative",
        width: "230px",
        color: "white",
        height: "270px",
        margin: "2rem 1rem",
      }}
    >
      <img
        className="w-full h-full object-fill"
        src={item.img}
        alt={item.title}
      />
      {showMessage && (
        <div className="absolute w-full h-full top-0 left-0 m-auto flex  gap-4  items-center justify-center bg-black opacity-60">
          <div className="w-7 h-7 flex items-center justify-center hover:scale-125 cursor-pointer">
            <FontAwesomeIcon
              onClick={() => {
                addProduct();
              }}
              style={{ width: "100%", height: "100%" }}
              icon={faCartShopping}
            />
          </div>
          <div className="w-7 h-7 flex items-center justify-center hover:scale-125 cursor-pointer">
            <FontAwesomeIcon
              style={{ width: "100%", height: "100%" }}
              icon={faHeart}
            />
          </div>
          <div className="w-7 h-7 flex items-center justify-center hover:scale-125 cursor-pointer">
            <FontAwesomeIcon
              onClick={() => {
                navigate(`/product/${item._id}`);
              }}
              style={{ width: "100%", height: "100%" }}
              icon={faCircleInfo}
            />
          </div>
        </div>
      )}

      <div className="text-black flex flex-col gap-3">
        <span>{item.title}</span>
        <span>NT$:{item.price}</span>
      </div>
    </div>
  );
};

export default Product;

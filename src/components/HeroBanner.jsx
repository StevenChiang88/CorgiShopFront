import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";

const HeroBanner = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handlerClick = (direction) => {
    direction == "left"
      ? setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
      : setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
  };
  return (
    <div className="h-full w-screen flex relative overflow-hidden ">
      {/* Wrapper */}
      <div
        style={{
          height: "100%",
          display: "flex",
          transform: `translateX(${slideIndex * -100}vw)`,
          transition: "all 1.5s ease",
        }}
      >
        {/* slider 1 */}
        <div className="flex w-screen h-screen items-center relative">
          {/* ImageContainer*/}
          <img
            className="w-screen h-screen object-cover object-top"
            src={require("../assets/Hero1.jpg")}
            alt="Hero1"
          />
          {/* InfoContainer */}
          <div className="absolute bg-black opacity-30 text-white  p-5 	">
            <div>我們提供各種柯基用品，及柯基周邊商品，柯基清洗用品</div>
            <button>前往購買</button>
          </div>
        </div>
        {/* slider 2 */}
        <div className="flex w-screen  h-screen items-center relative">
          {/* ImageContainer*/}
          <img
            className="w-full h-full object-cover object-top"
            src={require("../assets/Hero2.jpg")}
            alt="Hero1"
          />
          {/* InfoContainer */}
          <div className="absolute bg-black opacity-30 text-white p-5	">
            <div>我們提供各種柯基用品，及柯基周邊商品</div>
            <button>前往購買</button>
          </div>
        </div>
        {/* slider 3 */}
        <div className="flex w-screen h-screen items-center relative">
          {/* ImageContainer*/}
          <img
            className="w-full h-full object-cover object-top"
            src={require("../assets/Hero3.jpg")}
            alt="Hero1"
          />
          {/* InfoContainer */}
          <div className="absolute bg-black opacity-30 text-white p-5	">
            <div>我們提供各種柯基用品，及柯基周邊商品</div>
            <button className="px-4 py-2 bg-slate-500">前往購買</button>
          </div>
        </div>
      </div>

      {/* ArrowContainer */}
      <div className="absolute z-10 bottom-0 flex right-0 items-center justify-around bg-black opacity-30 w-20 h-10 ">
        <div
          onClick={() => handlerClick("left")}
          className=" flex  items-center content-center "
        >
          <FontAwesomeIcon
            style={{ cursor: "pointer", color: "white" }}
            icon={faAngleLeft}
          />
        </div>
        <div
          onClick={() => handlerClick("right")}
          className=" flex items-center content-center"
        >
          <FontAwesomeIcon
            style={{ cursor: "pointer", color: "white" }}
            icon={faAngleRight}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

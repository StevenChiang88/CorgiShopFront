import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";
import { calc, Flex } from "@chakra-ui/react";

const slider = [
  {
    title: "Hero1",
    link: "Hero1.jpg",
  },
  {
    title: "Hero2",
    link: "Hero2.jpg",
  },
  {
    title: "Hero3",
    link: "Hero3.jpg",
  },
];

const HeroBanner = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handlerClick = (direction) => {
    direction == "left"
      ? setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
      : setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
  };
  return (
    <Flex className="w-full relative" h={"calc(100vh - 5rem)"}>
      {slider.map((item, index) => {
        return (
          slideIndex === index && (
            <img
              key={index}
              className="w-screen h-full object-cover object-mid "
              src={require(`../assets/${item.link}`)}
              alt={item.title}
            />
          )
        );
      })}

      <div className="absolute z-10 top-[40%] flex left-0 items-center justify-around text-white bg-black opacity-30 w-60 h-20 ">
        <p>販賣各式柯基用品，周邊產品</p>
      </div>

      {/* ArrowContainer */}
      <div className="absolute z-10 bottom-0 flex right-0 items-center justify-around bg-black opacity-30 w-20 h-10 ">
        <div
          onClick={() => handlerClick("left")}
          className="flex flex-1 cursor-pointer items-center justify-center "
        >
          <FontAwesomeIcon style={{ color: "white" }} icon={faAngleLeft} />
        </div>
        <div
          onClick={() => handlerClick("right")}
          className="flex flex-1 cursor-pointer items-center justify-center"
        >
          <FontAwesomeIcon style={{ color: "white" }} icon={faAngleRight} />
        </div>
      </div>
    </Flex>
  );
};

export default HeroBanner;

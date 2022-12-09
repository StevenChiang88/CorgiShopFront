import React from "react";
import Category from "./Category";

const data = [
  {
    cat: "狗狗用藥",
    img: "https://firebasestorage.googleapis.com/v0/b/corgishop-6fecc.appspot.com/o/1670145847977%E8%80%B3%E5%BA%B7.jpeg?alt=media&token=90655a44-ec0a-46b6-a69c-9d7780f16ec1",
    link: "products/狗狗用藥",
  },
  {
    cat: "提袋",
    img: "https://firebasestorage.googleapis.com/v0/b/corgishop-6fecc.appspot.com/o/1670146553350%E6%9F%AF%E5%9F%BA%E6%89%8B%E6%8F%90%E8%A2%8B-%E7%81%B0%E8%89%B2.jpg?alt=media&token=c293d915-e7b1-4fca-83e8-1d105a8cca50",
    link: "products/提袋",
  },
  {
    cat: "無框畫",
    img: "https://firebasestorage.googleapis.com/v0/b/corgishop-6fecc.appspot.com/o/1670146648789%E6%9F%AF%E5%9F%BA%E7%84%A1%E6%A1%86%E7%95%AB-%E7%81%B0%E8%89%B2.jpg?alt=media&token=548911db-be9a-4e13-ba6f-4c524a0570e5",
    link: "products/無框畫",
  },
];
const Categories = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between m-4 gap-4">
      {data.map((item) => (
        <Category key={item.cat} data={item} />
      ))}
    </div>
  );
};

export default Categories;

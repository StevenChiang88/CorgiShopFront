import React from "react";
import Product from "./Product";

const Products = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-5 p-3 my-4 items-center justify-center">
      {data.map((item) => (
        <Product key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Products;

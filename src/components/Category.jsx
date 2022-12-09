import React from "react";
import { useNavigate } from "react-router-dom";

const Category = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 relative  text-white m-4">
      <img className="w-[320px] object-cover" src={data.img} alt={data.cat} />
      <div className="absolute w-full h-full top-0 left-0 m-auto flex flex-col  items-center justify-center  bg-black opacity-60">
        <h1 className="font-bold mb-4 ">{data.cat}</h1>
        <button
          onClick={() => {
            navigate(data.link);
          }}
          className="px-4 py-2 bg-slate-600"
        >
          現在購買
        </button>
      </div>
    </div>
  );
};

export default Category;

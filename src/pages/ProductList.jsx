import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import Products from "../components/Products";
import { useGetProductsQuery } from "../store/productApi";
import { useState } from "react";
import { useEffect } from "react";
import CouponBanner from "../components/CouponBanner";
import Pagination from "../components/Pagination";
const ProductList = () => {
  const { data, isSuccess } = useGetProductsQuery();
  const [filteredData, setFilteredData] = useState();
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  let keyWord;

  const keyWordHandler = (e) => {
    keyWord = e.target.value;
  };

  const categoryHandler = (cat) => {
    const X = data.filter((item) => {
      return item.categories.includes(cat);
    });
    setFilteredData(X);
  };
  const searchHandler = (keyWord) => {
    const X = data.filter((item) => {
      return item.title.includes(keyWord);
    });
    setFilteredData(X);
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  const [currentProduct, setCurrentProduct] = useState();
  const paginationHandler = () => {
    const x = filteredData.slice(firstProductIndex, lastProductIndex);
    setCurrentProduct(x);
  };

  useEffect(() => {
    filteredData && paginationHandler();
  }, [filteredData, firstProductIndex, lastProductIndex]);
  // pagination
  return (
    <div className="flex items-center justify-center flex-col w-full min-h-[calc(100vh_-_11rem) ">
      <CouponBanner />
      <div className="flex flex-col md:flex-row justify-start w-4/5 ">
        <div className="flex flex-col lg:flex-row items-center mt-4 border border-slate-400 px-8 py-6 md:mr-2">
          <h1 className="text-xl mr-4">Categories</h1>
          <div>
            <button
              onClick={() => {
                categoryHandler("柯基");
              }}
              className="border p-2 bg-slate-500 text-white"
            >
              全部商品
            </button>
            <button
              onClick={() => {
                categoryHandler("提袋");
              }}
              className="border p-2 bg-slate-500 text-white"
            >
              提袋
            </button>
            <button
              onClick={() => {
                categoryHandler("狗狗用藥");
              }}
              className="border p-2 bg-slate-500 text-white"
            >
              狗狗用藥
            </button>
            <button
              onClick={() => {
                categoryHandler("無框畫");
              }}
              className="border p-2 bg-slate-500 text-white"
            >
              無框畫
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center mt-4 border  border-slate-400 px-8 py-6">
          <h1 className="text-xl mr-4 ">Search Filter</h1>
          <div className="flex items-center ">
            <input
              value={keyWord}
              onChange={(e) => {
                keyWordHandler(e);
              }}
              className="p-2 border"
              placeholder="請輸入關鍵字"
            />
            <FontAwesomeIcon
              style={{
                cursor: "pointer",
                fontSize: "20px",
                marginLeft: "1rem",
              }}
              onClick={() => {
                searchHandler(keyWord);
              }}
              icon={faSearch}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-5/5 2xl:w-3/5">
        {currentProduct ? (
          <>
            <Products data={currentProduct} />
            <Pagination
              totalPosts={filteredData.length}
              productsPerPage={productsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <p>數據加載中</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;

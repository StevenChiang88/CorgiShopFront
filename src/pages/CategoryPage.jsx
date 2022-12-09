import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect } from "react";
import Products from "../components/Products";
import { useGetProductByCategoryQuery } from "../store/productApi";
import { useParams } from "react-router-dom";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import CouponBanner from "../components/CouponBanner";

const CategoryPage = () => {
  const cat = useParams();
  const { data: catData, isSuccess: catDataSuccess } =
    useGetProductByCategoryQuery(cat.category);
  const [filteredData, setFilterredData] = useState();

  useEffect(() => {
    setFilterredData(catData);
  }, [catData]);
  const filterHandler = (keyWord) => {
    let X = catData.filter((item) => {
      return item.title.includes(keyWord);
    });
    setFilterredData(X);
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-[calc(100vh_-_11rem)]">
      <CouponBanner />
      <div className="flex p-4 justify-start flex-col md:flex-row">
        <div className="flex items-center">
          <h1 className="mx-4">排序依據</h1>
          <select className="p-2 border border-black">
            <option>預設</option>
            <option>價格遞增</option>
            <option>價格遞減</option>
          </select>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <h1 className="mx-4">搜尋</h1>
          <input
            onChange={(e) => {
              filterHandler(e.target.value);
            }}
            className="p-2 border border-black"
            placeholder="請輸入關鍵字"
          />
          <FontAwesomeIcon
            className="text-xl ml-4 cursor-pointer"
            icon={faSearch}
          />
        </div>
      </div>
      <div>
        {filteredData ? (
          <Products data={filteredData} />
        ) : (
          <ChakraProvider>
            <Spinner size="xl" speed="0.65s" />
          </ChakraProvider>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

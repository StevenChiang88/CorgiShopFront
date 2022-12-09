import { Button, ChakraProvider, Spinner } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import HeroBanner from "../components/HeroBanner";
import Products from "../components/Products";
import { useGetProductByCategoryQuery } from "../store/productApi";

const HomePage = () => {
  const { data: bestSeller, isSuccess: bestSellerSuccess } =
    useGetProductByCategoryQuery("熱門");

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      {!bestSellerSuccess ? (
        <ChakraProvider>
          <Spinner size="xl" speed="0.65s" />
        </ChakraProvider>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <HeroBanner />
          <Categories />
          <div className="text-bold text-3xl m-4">Best Seller</div>
          <Products data={bestSeller} />

          <Button
            onClick={() => {
              navigate("/products");
            }}
            className="mt-[3rem] px-8 py-4 bg-slate-500 text-white hover:bg-slate-400"
          >
            查看更多商品
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

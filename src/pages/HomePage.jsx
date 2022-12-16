import { Button, ChakraProvider, Spinner } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import HeroBanner from "../components/HeroBanner";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import { useGetProductByCategoryQuery } from "../store/productApi";
const HomePage = () => {
  const { data: bestSeller, isSuccess: bestSellerSuccess } =
    useGetProductByCategoryQuery("熱門");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  const [currentProduct, setCurrentProduct] = useState();
  const paginationHandler = () => {
    const x = bestSeller.slice(firstProductIndex, lastProductIndex);
    setCurrentProduct(x);
  };

  useEffect(() => {
    bestSellerSuccess && paginationHandler();
  }, [bestSellerSuccess, firstProductIndex, lastProductIndex]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {!currentProduct ? (
        <ChakraProvider>
          <Spinner size="xl" speed="0.65s" />
        </ChakraProvider>
      ) : (
        <div className="flex  items-center justify-center flex-col">
          <HeroBanner />
          <Categories />
          <div className="text-bold text-3xl m-4">Best Seller</div>
          <Products data={currentProduct} />

          <Pagination
            totalPosts={bestSeller.length}
            productsPerPage={productsPerPage}
            setCurrentPage={setCurrentPage}
          />
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

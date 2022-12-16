import { Button } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ totalPosts, productsPerPage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / productsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="mt-8">
      {pages.map((item, index) => {
        return (
          <Button
            className="p-2 bg-slate-300 m-2"
            onClick={() => {
              setCurrentPage(item);
            }}
            key={index}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default Pagination;

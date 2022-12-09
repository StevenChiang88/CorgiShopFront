import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrdersByUserIdQuery } from "../store/orderApi";
import dayjs from "dayjs";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
const OrderPage = () => {
  const { userId } = useParams();
  const { data, isSuccess } = useGetOrdersByUserIdQuery(userId);
  const getOrderFn = useGetOrdersByUserIdQuery(userId);

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (auth.isLogged === false) {
    navigate("/login");
  }
  useEffect(() => {
    getOrderFn.refetch();
  });
  return (
    <div className="flex justify-center p-10 min-h-[calc(100vh_-_11rem)]">
      {isSuccess ? (
        <ChakraProvider>
          <div className="w-full overflow-x-auto">
            <Table variant="simple">
              <Thead>
                <Tr className="flex">
                  <Th className="w-[260px] md:w-[20%] ">訂單號碼</Th>
                  <Th className="w-[150px] md:w-[20%] ">訂單日期</Th>
                  <Th className="w-[200px] md:w-[20%] ">收件地址</Th>
                  <Th className="w-[350px] md:w-[30%] ">訂單商品</Th>
                  <Th className="w-[100px] md:w-[10%] " isNumeric>
                    訂單總額
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item._id} className="flex">
                    <Td className="w-[260px] md:w-[20%] ">{item._id}</Td>
                    <Td className="w-[150px] md:w-[20%] ">
                      {dayjs(item.createdAt).format("YYYY/MM/DD")}
                    </Td>
                    <Td className="w-[200px] md:w-[20%] ">
                      {item.address.city}
                      {item.address.area}
                      {item.address.street}
                    </Td>
                    <Td className="w-[350px] md:w-[30%] ">
                      {item.products.map((product) => (
                        <>
                          <div
                            className="flex justify-between items-center "
                            key={product._id}
                          >
                            <span>
                              {product.title}x{product.quantity}
                            </span>

                            <span>單價: {product.price.toLocaleString()}</span>
                          </div>
                          <hr />
                        </>
                      ))}
                    </Td>
                    <Td className="w-[100px] md:w-[10%]  " isNumeric>
                      {item.total.toLocaleString()}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </ChakraProvider>
      ) : (
        <ChakraProvider>
          <Spinner />
        </ChakraProvider>
      )}
    </div>
  );
};

// {data.map((item) => (
//   <tr key={item._id}>
//     <span>{item._id}</span>
//     <input disabled={true} placeholder={item.createdAt} />
//     <span>{item.consignee}</span>
//     <span>{item.address}</span>
//     <span>
//       {item.products.map((product) => (
//         <p>{product.productId}</p>
//       ))}
//     </span>
//     <span>{item.total.toLocaleString()}</span>
//   </tr>
// ))}
export default OrderPage;

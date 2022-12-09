import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { removeToCart, updateCartQuantity } from "../store/reducer/cartSlice";
import { useAddOrderMutation } from "../store/orderApi";

const CheckoutPage = () => {
  const toast = useToast();
  const data = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addOrderFn, status] = useAddOrderMutation();
  const addOrderHandler = async () => {
    const res = await addOrderFn(orderInfo);
    if (res.error) {
      toast({
        title: "發生錯誤",
        description: "請確認收件人、手機、地址欄位都輸入完成",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      navigate(`/order/${auth.userId}`);
    }
  };

  useEffect(() => {
    if (auth.isLogged === false) {
      navigate("/login");
    }
  });
  const deleteItemHandler = (item) => {
    const X = data.products.filter((product) => product.uuid !== item.uuid);
    const Y = data.products.filter((product) => product.uuid == item.uuid);
    const removedItemPrice = Y[0].quantity * Y[0].product.price;
    dispatch(removeToCart({ newProducts: X, newTotal: removedItemPrice }));
  };

  useEffect(() => {
    //處理cartState，符合OrderApi接收的資料
    let productsForOrderInfo = [];
    data.products.map((item) => {
      productsForOrderInfo.push({
        productId: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        title: item.product.title,
      });
    });
    setOrderInfo({ ...orderInfo, products: productsForOrderInfo });
  }, [data]);

  const cartQuantityHandler = (e, item) => {
    let X = data.products.filter((product) => product.uuid !== item.uuid);
    const Y = data.products.filter((product) => product.uuid == item.uuid);
    const Z = { ...Y[0], quantity: Number(e.target.value) };
    X.push(Z);
    let total = 0;
    X.forEach((Xitem) => {
      total += Xitem.product.price * Xitem.quantity;
    });

    dispatch(updateCartQuantity({ products: X, total }));
  };

  //處理結束

  const [orderInfoShow, setOrderInfoShow] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    userId: auth.userId,
    products: null,
    total: data.total,
    address: {
      city: null,
      area: null,
      street: null,
    },
    consignee: null,
    phone: null,
  });

  //處理城市與區域 Start
  let areaSelect;
  if (orderInfo.address.city === "台北市") {
    areaSelect = (
      <Select
        onChange={(e) => {
          setOrderInfo({
            ...orderInfo,
            address: { ...orderInfo.address, area: e.target.value },
          });
        }}
        placeholder="請選擇區域"
      >
        <option value="信義區">信義區</option>
        <option value="大安區">大安區</option>
        <option value="中山區">中山區</option>
        <option value="松山區">松山區</option>
      </Select>
    );
  } else if (orderInfo.address.city === "新北市") {
    areaSelect = (
      <Select
        onChange={(e) => {
          setOrderInfo({
            ...orderInfo,
            address: { ...orderInfo.address, area: e.target.value },
          });
        }}
        placeholder="請選擇區域"
      >
        <option value="板橋區">板橋區</option>
        <option value="中和區">中和區</option>
        <option value="永和區">永和區</option>
        <option value="淡水區">淡水區</option>
      </Select>
    );
  } else {
    areaSelect = (
      <Select>
        <option>請先選擇城市</option>
      </Select>
    );
  }
  //處理城市與區域 end

  //處理優惠碼
  const [isUsedCoupon, setIsUsedCoupon] = useState(false);
  const [couponInput, setCouponInput] = useState();

  const traceCouponInput = (e) => {
    setCouponInput(e.target.value);
  };
  const checkCouponHandler = (e) => {
    if (couponInput == "corgi") {
      setIsUsedCoupon(true);
      const totalMinusCoupon = parseInt(data.total * 0.8);
      setOrderInfo({ ...orderInfo, total: totalMinusCoupon });
    } else {
      setIsUsedCoupon(false);
    }
  };

  return (
    <div className="flex flex-col w-full  items-center min-h-[calc(100vh_-_11rem)] ">
      <h1 className="text-2xl text-bold m-8">購物車清單</h1>
      <ChakraProvider>
        <div className="w-[95%] lg:w-[50%] overflow-x-auto ">
          <Table variant="simple" className="text-sm">
            <Thead>
              <Tr className="flex">
                <Th className="w-[200px] md:w-[20%]  ">商品資料</Th>
                <Th className="w-[100px] md:w-[20%]  ">數量</Th>
                <Th className="w-[100px] md:w-[20%] " isNumeric>
                  單件價格
                </Th>
                <Th className="w-[100px] md:w-[20%] " isNumeric>
                  小計
                </Th>
                <Th className="w-[100px] md:w-[20%] " isNumeric>
                  刪除
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {data.products.map((item) => (
                <Tr key={item.product._id} className="flex">
                  <Td className="w-[200px] md:w-[20%] ">
                    {item.product.title}
                  </Td>
                  <Td className="w-[100px] md:w-[20%]">
                    <Input
                      disabled={isUsedCoupon}
                      onChange={(e) => {
                        cartQuantityHandler(e, item);
                      }}
                      defaultValue={item.quantity}
                    />
                  </Td>
                  <Td className="w-[100px] md:w-[20%]" isNumeric>
                    {item.product.price.toLocaleString()}
                  </Td>
                  <Td className="w-[100px] md:w-[20%]" isNumeric>
                    {(item.product.price * item.quantity).toLocaleString()}
                  </Td>
                  <Td className="w-[100px] md:w-[20%]" isNumeric>
                    <Button
                      onClick={() => {
                        deleteItemHandler(item);
                      }}
                    >
                      刪除
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {data.total === 0 && (
            <>
              <h1 className="text-center m-8">購物車內空無一物~</h1>
              <hr className="mt-2" />
            </>
          )}

          <div className="flex w-full  justify-between mt-2">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                onChange={(e) => {
                  traceCouponInput(e);
                }}
                disabled={isUsedCoupon}
                placeholder="優惠碼: corgi"
              />
              <Button
                onClick={() => {
                  checkCouponHandler();
                }}
                className="w-[130px]"
                disabled={isUsedCoupon}
              >
                套用
              </Button>
            </div>

            <div className="flex items-center justify-center mr-4">
              總金額: ${data.total.toLocaleString()}
            </div>
            {isUsedCoupon ? (
              <div className="flex items-center justify-center mr-4 text-red-500">
                折扣後: ${orderInfo.total.toLocaleString()}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-[95%] lg:w-[50%] flex gap-4 flex-row mt-8 justify-center md:justify-end">
          <Button
            className="w-[130px]"
            onClick={() => {
              navigate("/products");
            }}
          >
            繼續購物
          </Button>
          <Button
            onClick={() => {
              setOrderInfoShow(true);
            }}
            className="w-[130px]"
          >
            結帳
          </Button>
        </div>
        {orderInfoShow && data.total !== 0 && (
          <div className="mt-4 w-[95%] lg:w-[50%] ">
            <form>
              <div className="flex gap-4">
                <FormControl isRequired={true}>
                  <FormLabel>收件人</FormLabel>
                  <Input
                    onChange={(e) => {
                      setOrderInfo({
                        ...orderInfo,
                        consignee: e.target.value,
                      });
                    }}
                    placeholder="請輸入姓名"
                  />
                </FormControl>
                <FormControl isRequired={true}>
                  <FormLabel>手機</FormLabel>
                  <Input
                    onChange={(e) => {
                      setOrderInfo({ ...orderInfo, phone: e.target.value });
                    }}
                    placeholder="請輸入手機"
                  />
                </FormControl>
              </div>
              <div className="mt-4 flex flex-col ">
                <FormControl isRequired={true}>
                  <FormLabel>地址</FormLabel>
                  <div className="flex gap-4">
                    <Select
                      onChange={(e) => {
                        setOrderInfo({
                          ...orderInfo,
                          address: {
                            ...orderInfo.address,
                            city: e.target.value,
                          },
                        });
                      }}
                      placeholder="請選擇城市"
                    >
                      <option value="台北市">台北市</option>
                      <option value="新北市">新北市</option>
                    </Select>

                    {areaSelect}
                  </div>
                </FormControl>
                <Input
                  onChange={(e) => {
                    setOrderInfo({
                      ...orderInfo,
                      address: {
                        ...orderInfo.address,
                        street: e.target.value,
                      },
                    });
                  }}
                  className="mt-4"
                  isRequired={true}
                  placeholder="請輸入地址"
                />
              </div>

              <FormControl className="mt-4">
                <FormLabel>備註</FormLabel>
                <Textarea />
              </FormControl>
              <Button
                type="submit"
                className="mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  addOrderHandler();
                  console.log(orderInfo);
                  console.log(data, "REDUX");
                }}
              >
                送出訂單
              </Button>
            </form>
          </div>
        )}
      </ChakraProvider>
    </div>
  );
};

export default CheckoutPage;

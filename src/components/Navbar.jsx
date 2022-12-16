import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../store/reducer/authSlice";

const Navbar = () => {
  const { quantity } = useSelector((state) => state.cart);
  const [cartShow, setCartShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const auth = useSelector((state) => state.auth);
  let orderLink = "order/" + auth.userId;
  let Links = [
    { name: "首頁", link: "/corgishopfront" },
    { name: "所有商品", link: "/products" },
    { name: "訂單查詢", link: orderLink },
    { name: "購物清單", link: "/checkout" },
  ];

  const dispatch = useDispatch();

  return (
    <div className="shadow-md z-50 h-[5rem] w-full sticky top-0 left-0 py-4 px-8 bg-slate-500 flex justify-between  items-center  ">
      <div>
        <NavLink to="/corgishopfront">
          <span className="font-bold  text-2xl">Corgi Shop.</span>
        </NavLink>
      </div>
      <div>
        <ul className="hidden lg:flex gap-4 font-bold ">
          {Links.map((item) => (
            <NavLink
              key={item.name}
              style={({ isActive }) => {
                return isActive ? { color: " white" } : null;
              }}
              to={item.link}
            >
              <li className="hover:text-white duration-300" key={item.name}>
                {item.name}
              </li>
            </NavLink>
          ))}
          {auth.isLogged ? (
            <li
              onClick={() => {
                dispatch(userLogOut());
              }}
              className="hover:text-white duration-300 cursor-pointer"
            >
              登出
            </li>
          ) : (
            <NavLink to="/login">
              <li className="hover:text-white duration-300">登入</li>
            </NavLink>
          )}
        </ul>
      </div>
      <div className="flex gap-4">
        <div className="flex relative ">
          <FontAwesomeIcon
            className="text-lg cursor-pointer"
            onClick={() => {
              setCartShow((prevstate) => !prevstate);
            }}
            icon={faCartShopping}
          />
          <span className="absolute rounded-full bg-red-600  -right-3 -top-3  text-white text-sm w-4 h-4 text-center">
            {quantity}
          </span>

          {cartShow && <Cart setCartShow={setCartShow} />}
        </div>
        <FontAwesomeIcon
          onClick={() => {
            setMenuShow((prevState) => !prevState);
          }}
          className="lg:hidden text-lg cursor-pointer "
          icon={faBars}
        />
      </div>
      {/* 手機版本 */}
      {menuShow && (
        <ul className=" absolute top-[5rem] left-0 w-full p-4 bg-slate-300  font-bold ">
          {Links.map((item) => (
            <NavLink
              key={item.name}
              style={({ isActive }) => {
                return isActive ? { color: " blue" } : null;
              }}
              to={item.link}
            >
              <li
                onClick={() => {
                  setMenuShow(false);
                }}
                className="hover:text-white duration-300 mt-2"
                key={item.name}
              >
                {item.name}
              </li>
            </NavLink>
          ))}
          {auth.isLogged ? (
            <li
              onClick={() => {
                dispatch(userLogOut());
                setMenuShow(false);
              }}
              className="mt-2 hover:text-white duration-300 cursor-pointer"
            >
              登出
            </li>
          ) : (
            <NavLink to="/login">
              <li
                onClick={() => {
                  setMenuShow(false);
                }}
                className="mt-2 hover:text-white duration-300 "
              >
                登入
              </li>
            </NavLink>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;

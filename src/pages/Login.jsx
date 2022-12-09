import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../store/authApi";
import { userLogIn } from "../store/reducer/authSlice";

const Login = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  console.log(userName, password);
  const [loginFn, { error: loginError }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const log = useSelector((state) => state.auth);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginFn({ username: userName, password });
      dispatch(userLogIn({ userId: data._id, token: data.accessToken }));
      navigate("/");
    } catch (err) {
      alert("帳號或密碼輸入錯誤");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4  min-h-[calc(100vh_-_11rem)]">
      <div className="m-8 text-2xl">Login</div>
      <form className=" w-4/5 lg:w-1/5  p-4 border flex flex-col items-center justify-center gap-4">
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          className="border  w-full  border-gray-700 p-2"
          placeholder="帳號"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="border  w-full  border-gray-700 p-2"
          placeholder="密碼"
        />
        <button
          onClick={(e) => {
            loginHandler(e);
          }}
          className="border w-full bg-zinc-700 text-white pt-2 pb-2 pl-4 pr-4"
        >
          登入
        </button>
        <p
          onClick={() => {
            navigate("/register");
          }}
          className="cursor-pointer	"
        >
          沒有帳號嗎? 點擊前往註冊
        </p>
      </form>
    </div>
  );
};

export default Login;

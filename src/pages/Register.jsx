import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserSignUpMutation } from "../store/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [userSignUpFn, isError] = useUserSignUpMutation();
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [passWordTest, setPassWordTest] = useState("");
  const [mail, setMail] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const userSignUpHandler = async () => {
    const res = await userSignUpFn({
      username: userName,
      password: passWord,
      email: mail,
    });

    const redirectHandler = () => {
      alert("註冊成功");
      navigate("/login");
    };

    res.data && redirectHandler();
    res.error && setErrorMessage("帳號或信箱已有人使用");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4  min-h-[calc(100vh_-_11rem)] ">
      <div className="m-8 text-2xl">Register</div>
      <form className=" w-4/5 lg:w-1/5  p-4 border flex flex-col items-center justify-center gap-4">
        <input
          type="email"
          className="border  w-full  border-gray-700 p-2"
          placeholder="信箱"
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        <input
          className="border  w-full  border-gray-700 p-2"
          placeholder="帳號"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <input
          type="password"
          onChange={(e) => {
            setPassWord(e.target.value);
          }}
          className="border  w-full  border-gray-700 p-2"
          placeholder="密碼"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassWordTest(e.target.value);
          }}
          className="border  w-full  border-gray-700 p-2"
          placeholder="確認密碼"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (passWord != passWordTest) {
              setErrorMessage("兩次密碼不一致");
              console.log(passWord, passWordTest);
            } else if (
              passWord == "" ||
              passWordTest == "" ||
              userName == "" ||
              mail == ""
            ) {
              setErrorMessage("請確認所有資料都已填入");
            } else {
              setPassWord(passWord);
              userSignUpHandler();
            }
          }}
          className="border w-full bg-zinc-700 text-white pt-2 pb-2 pl-4 pr-4"
        >
          註冊
        </button>
        <p
          onClick={() => {
            navigate("/login");
          }}
          className="cursor-pointer	"
        >
          已有帳號嗎? 點擊前往登入
        </p>
      </form>
    </div>
  );
};

export default Register;

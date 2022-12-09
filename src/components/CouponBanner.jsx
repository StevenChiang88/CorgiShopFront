import React from "react";

const CouponBanner = () => {
  return (
    <div className="w-4/5 max-h-[250px] mt-8 border border-slate-400 flex md:p-8">
      <div className="flex flex-1 items-center justify-center">
        <img
          className="w-full h-full object-cover "
          src={require("../assets/Hero3.jpg")}
          alt="Hero1"
        />
      </div>

      <div className="flex-[2] lg:flex-[4] p-4 ">
        <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold  mb-4">
          照顧毛孩，讓他健康長大!
        </h2>
        <span className="text-sm md:text-xl lg:text-2xl">
          輸入優惠碼corgi，即享有8折優惠
        </span>
      </div>
    </div>
  );
};

export default CouponBanner;

import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import React from "react";

const DynamicShopScreen = dynamic(() => import("@/screens/ShopScreen"), {
  loading: () => <Loading />,
});
const page = () => {
  return <DynamicShopScreen />;
};

export default page;

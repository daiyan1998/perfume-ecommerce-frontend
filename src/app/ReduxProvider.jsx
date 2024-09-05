"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "../store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const ReduxProvider = ({ children }) => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = store();
  }
  return (
    <Provider store={storeRef.current}>
      <Toaster />
      <PayPalScriptProvider>{children}</PayPalScriptProvider>
    </Provider>
  );
};

export default ReduxProvider;

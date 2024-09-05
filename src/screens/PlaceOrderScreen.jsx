"use client";
import Info from "@/components/checkout/Info";
import Review from "@/components/checkout/Review";
import Loading from "@/components/Loading";
import SimpleCheckoutSteps from "@/components/SimpleCheckoutSteps";
import { clearCartItems } from "@/slices/cartSlice";
import { useCreateOrderMutation } from "@/slices/ordersApiSlice";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const PlaceOrderScreen = () => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      router.push("/shipping");
    } else if (!cart.paymentMethod) {
      router.push("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress?.address, router]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      router.push(`/order/${res._id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <SimpleCheckoutSteps step1 step2 step3 step4 />
      <Grid container spacing={5}>
        <Grid item xs={5}>
          <Info cart={cart} />
        </Grid>
        <Grid item xs={7}>
          <Review cart={cart} />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={placeOrderHandler}
        disabled={isLoading}
      >
        Place Order
      </Button>
    </>
  );
};

export default PlaceOrderScreen;

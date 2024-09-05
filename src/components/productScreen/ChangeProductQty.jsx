"use client";
import { addToCart } from "@/slices/cartSlice";
import { changeQty } from "@/slices/select";
import { Add, Remove } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChangeProductQty = ({ product }) => {
  const { qty, ml, price } = useSelector((state) => state.select);
  const dispatch = useDispatch();
  // @desc Function to increase the quantity.
  const increaseQuantity = () => {
    dispatch(changeQty(1));
    // setQty(qty + 1);
  };

  // @desc Function to decrease the quantity.
  const decreaseQuantity = () => {
    dispatch(changeQty(-1));
    if (qty > 1) {
      // setQty(qty - 1);
    }
  };
  const addToCartHandler = () => {
    let cartUniqueId = `${product._id}-${ml}`;
    dispatch(addToCart({ ...product, qty, price, ml, cartUniqueId }));
  };
  return (
    <Box display="flex" gap={2}>
      <ButtonGroup>
        <Button
          variant="contained"
          aria-label="reduce"
          onClick={decreaseQuantity}
        >
          <Remove fontSize="small" />
        </Button>
        <Typography p={1} px={2}>
          {qty}
        </Typography>
        <Button
          variant="contained"
          aria-label="increase"
          onClick={increaseQuantity}
        >
          <Add fontSize="small" />
        </Button>
      </ButtonGroup>
      <Button variant="contained" disabled={!ml} onClick={addToCartHandler}>
        Add To Cart
      </Button>
    </Box>
  );
};

export default ChangeProductQty;

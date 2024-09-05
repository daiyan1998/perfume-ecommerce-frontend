"use client";
import { Add, Close, Remove, RemoveCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeItemCount, removeFromCart } from "@/slices/cartSlice";
import Link from "next/link";
import SimpleCheckoutSteps from "@/components/SimpleCheckoutSteps";

export const CartItemCheckout = ({ cartItem }) => {
  const [qty, SetQty] = useState(cartItem.qty);
  const dispatch = useDispatch();

  const increase = () => {
    SetQty(qty + 1);
  };

  const decrease = () => {
    if (qty === 1) return qty;
    SetQty(qty - 1);
  };

  // useEffect to handle state updates after render
  useEffect(() => {
    dispatch(changeItemCount({ ...cartItem, qty }));
  }, [qty]);

  const removeFromCartHandler = (cartUniqueId) => {
    dispatch(removeFromCart({ cartUniqueId }));
  };
  return (
    <Paper
      sx={{
        p: 2,
        position: "relative",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase
            sx={{ width: { xs: 250, sm: 150 }, height: { xs: 300, sm: 100 } }}
          >
            <Image
              alt="complex"
              src={cartItem.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              style={{ objectFit: "cover" }}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {cartItem.name}
              </Typography>
              <Stack direction="row" gap={1}>
                <Typography gutterBottom>
                  ৳{cartItem.price} x {cartItem.qty}
                </Typography>
                <Typography color="primary">
                  ৳{cartItem.price * cartItem.qty}
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row">
                <Button onClick={decrease} variant="contained">
                  <Remove />
                </Button>
                <Box p={1} width="2rem">
                  {qty}
                </Box>
                <Button onClick={increase} variant="contained">
                  <Add />
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <IconButton
        sx={{ position: "absolute", right: "5px", top: "5px" }}
        onClick={() => removeFromCartHandler(cartItem.cartUniqueId)}
      >
        <Close />
      </IconButton>
    </Paper>
  );
};

const SideBar = ({ itemsPrice }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography color={grey[500]}>Total : </Typography>
        <Typography fontWeight={600} fontSize={20}>
          ৳{itemsPrice}
        </Typography>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack gap={2}>
        <Typography>Additional Comment</Typography>
        <TextField id="filled-multiline-static" multiline rows={4} fullWidth />
        <TextField
          id="outlined-password-input"
          label="Voucher"
          type="text"
          autoComplete="voucher"
          fullWidth
        />
        <Button variant="contained" fullWidth>
          Apply Voucher
        </Button>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <div>
        <FormControl fullWidth>
          <FormLabel id="demo-radio-buttons-group-label">Shipping</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={60}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value={60}
              control={<Radio />}
              label={<Typography>Inside Dhaka : ৳60</Typography>}
            />
            <FormControlLabel
              value={100}
              control={<Radio />}
              label={<Typography>Sub Dhaka : ৳100</Typography>}
            />
            <FormControlLabel
              value={120}
              control={<Radio />}
              label={<Typography>Outside Dhaka : ৳120</Typography>}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <Link href="/shipping">
        <Button variant="contained" fullWidth>
          Continue
        </Button>
      </Link>
    </Paper>
  );
};

const CartScreen = () => {
  const { cartItems, itemsPrice } = useSelector((state) => state.cart);

  if (!cartItems || cartItems.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#F6F9FC"
      >
        <Image
          src="/shopping-bag.svg"
          height={300}
          width={200}
          alt="shopping bag"
        />
        <Typography variant="h4" p={1} align="center">
          Your shopping bag is empty. Start shopping
        </Typography>
      </Box>
    ); // or any loading state
  }
  return (
    <>
      <Box bgcolor="#F6F9FC">
        <SimpleCheckoutSteps step1 />
        <Container sx={{ py: 5 }}>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <Stack direction={{ sm: "column" }} gap={2}>
                {cartItems.map((cartItem) => (
                  <CartItemCheckout
                    key={cartItem.cartUniqueId}
                    cartItem={cartItem}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item md={4} xs={12}>
              <SideBar itemsPrice={itemsPrice} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CartScreen;

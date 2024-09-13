"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Badge,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  CloseOutlined,
  LocalMallOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { useSelector } from "react-redux";
import CartItem from "../CartItem";
import Link from "next/link";

export default function CartDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { cartItems, itemsPrice } = useSelector((state) => state.cart);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: { lg: 350, xs: "100%" },
        height: "calc(100% - 74px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box>
        <Stack p={1} direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={1}>
            <LocalMallOutlined />
            <Typography>{cartItems?.length} Item</Typography>
          </Stack>
          <IconButton onClick={toggleDrawer(anchor, false)}>
            <CloseOutlined />
          </IconButton>
        </Stack>
        <Divider />
        {cartItems?.length > 0 ? (
          <Box display="flex" flexDirection="column">
            {/* CartItem Component for items inside cart view */}
            {cartItems?.map((item, i) => (
              <div key={`${item._id}${i}`}>
                <CartItem item={item} />
                <Divider />
              </div>
            ))}
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Image
              src="/shopping-bag.svg"
              height={300}
              width={200}
              alt="shopping bag"
            />
            <Typography p={1} align="center">
              Your shopping bag is empty. Start shopping
            </Typography>
          </Box>
        )}
      </Box>
      {cartItems?.length > 0 && (
        <Box p={2}>
          <Divider />
          <Stack p={2} direction="row" justifyContent="space-between">
            <Typography variant="h5">Sub Total :</Typography>
            <Typography color="primary" variant="h5">
              {itemsPrice}৳
            </Typography>
          </Stack>
          <Link href="/cart">
            <Button
              variant="outlined"
              fullWidth
              onClick={toggleDrawer(anchor, false)}
            >
              View Cart
            </Button>
          </Link>
          <Button sx={{ my: 2 }} variant="contained" fullWidth>
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={toggleDrawer("right", true)}
        variant="contained"
      >
        <Badge
          badgeContent={cartItems?.length > 0 ? cartItems.length : 0}
          color="error"
        >
          <ShoppingCartOutlined />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </>
  );
}

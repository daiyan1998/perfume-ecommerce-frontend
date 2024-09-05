"use client";
import Loading from "@/components/Loading";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "@/slices/ordersApiSlice";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useParams } from "next/navigation";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment successful");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    });
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment successful");
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Alert variant="outlined" severity="error">
      Something went wrong
    </Alert>
  ) : (
    <Box bgcolor="#F6F9FC">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography variant="h5" padding={2}>
              Shipping
            </Typography>
            <Paper sx={{ padding: 2 }}>
              <List>
                <ListItem>
                  <Typography>
                    <Typography component="span" variant="h6">
                      Name :{" "}
                    </Typography>
                    {order.user.name}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    <Typography component="span" variant="h6">
                      Email :{" "}
                    </Typography>
                    {order.user.email}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    <Typography component="span" variant="h6">
                      Address :{" "}
                    </Typography>
                    {order.shippingAddress.address}
                  </Typography>
                </ListItem>
              </List>
              <Alert severity={order.isDelivered ? "success" : "error"}>
                {order.isDelivered ? order.deliveredAt : "Not Delivered"}
              </Alert>
            </Paper>

            <Typography variant="h5" padding={2}>
              Payment Method
            </Typography>
            <Paper sx={{ padding: 2 }}>
              <List>
                <ListItem>
                  <Typography>
                    <Typography component="span" variant="h6">
                      Method :{" "}
                    </Typography>
                    {order.paymentMethod}
                  </Typography>
                </ListItem>
              </List>
              <Alert severity={order.isPaid ? "success" : "error"}>
                {order.isPaid ? `Paid at ${order.paidAt}` : "Not Paid"}
              </Alert>
            </Paper>
            <Divider />
            <Typography variant="h5" padding={2}>
              Order Items
            </Typography>
            <Paper sx={{ padding: 2 }}>
              <List>
                {order.orderItems.map((orderItem) => (
                  <ListItem
                    key={orderItem._id}
                    secondaryAction={
                      <Typography>
                        {orderItem.price} * {orderItem.qty} ={" "}
                        {orderItem.price * orderItem.qty}
                      </Typography>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={orderItem.image}></Avatar>
                    </ListItemAvatar>
                    <ListItemText>{orderItem.name}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5" padding={2}>
              Order Summary
            </Typography>
            <Paper>
              <List>
                <ListItem
                  secondaryAction={<Typography>${order.itemsPrice}</Typography>}
                >
                  <ListItemText>Items</ListItemText>
                </ListItem>
                <ListItem
                  secondaryAction={
                    <Typography>${order.shippingPrice}</Typography>
                  }
                >
                  <ListItemText>Shipping</ListItemText>
                </ListItem>
                <ListItem
                  secondaryAction={<Typography>${order.totalPrice}</Typography>}
                >
                  <ListItemText>Total</ListItemText>
                </ListItem>
                {/* Admin */}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListItem>
                      <Button variant="contained" onClick={deliverOrderHandler}>
                        Mark as Delivered
                      </Button>
                    </ListItem>
                  )}
              </List>
            </Paper>
            <Paper>
              {!order.isPaid && !userInfo.isAdmin && (
                <>
                  {loadingPay && <CircularProgress />}
                  {isPending ? (
                    <CircularProgress />
                  ) : (
                    <>
                      {/* <Button variant="contained" onClick={onApproveTest}>
                        Test Pay order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </>
                  )}
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrderScreen;

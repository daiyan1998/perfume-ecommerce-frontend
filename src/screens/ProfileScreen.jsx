"use client";
import Loading from "@/components/Loading";
import { setCredentials } from "@/slices/authSlice";
import { useGetMyOrdersQuery } from "@/slices/ordersApiSlice";
import { useProfileMutation } from "@/slices/userApiSlice";
import {
  Person,
  ReportGmailerrorred,
  ShoppingBag,
  Visibility,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    data: orders,
    isLoading: loadingMyOrders,
    error,
  } = useGetMyOrdersQuery();

  console.log(orders);
  useEffect(() => {
    if (!userInfo) {
      return redirect("/");
    }
  }, [userInfo]);
  console.log(userInfo);
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  if (!userInfo) {
    return null;
  }
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            margin="20px 0px"
          >
            <Person />
            <Typography variant="h4" sx={{ fontWeight: 3 }}>
              Your Profile
            </Typography>
          </Stack>
          <FormControl
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            onSubmit={submitHandler}
          >
            <TextField label="Name" name="name" defaultValue={userInfo.name} />
            <TextField
              label="Email"
              name="email"
              defaultValue={userInfo.email}
            />
            <TextField label="Password" name="password" />
            <TextField label="Confirm Password" name="confirmPassword" />
            <Button type="submit" variant="contained">
              Update
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            margin="20px 0px"
          >
            <ShoppingBag />
            <Typography variant="h4" sx={{ fontWeight: 3 }}>
              Your Orders
            </Typography>
          </Stack>
          {loadingMyOrders ? (
            <Loading />
          ) : error ? (
            <Alert severity="error">
              {error?.data?.message || error?.error}
            </Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Delivered</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow
                      key={order._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.createdAt}</TableCell>
                      <TableCell>৳{order.totalPrice}</TableCell>
                      <TableCell>
                        {order.paidAt ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <ReportGmailerrorred color="error" />
                        )}
                      </TableCell>
                      <TableCell>
                        {order.deliveredAt ? (
                          order.deliveredAt
                        ) : (
                          <ReportGmailerrorred color="error" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Link href={`/order/${order._id}`}>
                          <Tooltip title="view">
                            <IconButton>
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileScreen;

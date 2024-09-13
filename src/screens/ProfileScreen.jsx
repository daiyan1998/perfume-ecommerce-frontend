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
import Image from "next/image";
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

  useEffect(() => {
    if (!userInfo) {
      return redirect("/");
    }
  }, [userInfo]);
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

  if (loadingMyOrders) return <Loading />;
  if (error)
    return (
      <Alert severity="error">{error?.data?.message || error?.error}</Alert>
    );

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid
          item
          md={3}
          xs={12}
          sx={{ display: { xs: "flex", md: "block" }, flexDirection: "column" }}
        >
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
        <Grid item md={9} xs={12}>
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
          {orders?.length > 0 ? (
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
                      <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
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
                          order.deliveredAt.substring(0, 10)
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
          ) : (
            <Stack justifyContent="center" alignItems="center">
              <Image src="/no-data.jpg" height={300} width={300} />
              <Typography variant="h5">No Orders</Typography>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileScreen;

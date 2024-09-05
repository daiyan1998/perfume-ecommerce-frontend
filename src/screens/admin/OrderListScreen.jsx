"use client";
import Loading from "@/components/Loading";
import { useGetOrdersQuery } from "@/slices/ordersApiSlice";
import { ReportGmailerrorred, Visibility } from "@mui/icons-material";
import {
  Alert,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Link from "next/link";
import React from "react";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h2">Orders</Typography>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Alert severity="error">{error?.data?.message}</Alert>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Delivered</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user?.name}</TableCell>
                  <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <ReportGmailerrorred color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    {order.isDelivered ? (
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
      )}
    </Container>
  );
};

export default OrderListScreen;

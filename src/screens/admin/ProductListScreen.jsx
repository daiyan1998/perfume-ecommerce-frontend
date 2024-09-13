"use client";
import Loading from "@/components/Loading";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/slices/productsApiSlice";
import { Delete, EditNote, Visibility } from "@mui/icons-material";
import {
  Alert,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const ProductListScreen = () => {
  // redux calls
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber: 1,
  });

  const products = data?.products;
  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDeleteProduct }] =
    useDeleteProductMutation();

  // functions and handlers
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Container sx={{ mt: 10 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography sx={{ typography: { md: "h3", xs: "h4" } }}>
          Products
        </Typography>
        <div>
          <Button
            variant="outlined"
            startIcon={<EditNote />}
            onClick={createProductHandler}
          >
            Create Product
          </Button>
        </div>
      </Stack>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : (
        <Paper variant="outlined">
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader={true}>
              <TableHead
                sx={{ backgroundColor: "#F3F5F9", fontWeight: "bold" }}
              >
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price Range</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      ৳{product.priceByMl[0]?.price} - ৳
                      {product.priceByMl[product.priceByMl.length - 1]?.price}{" "}
                    </TableCell>
                    <TableCell>Will add</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <Link href={`/product/${product._id}/edit`}>
                          <IconButton>
                            <EditNote />
                          </IconButton>
                        </Link>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteHandler(product._id)}>
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default ProductListScreen;

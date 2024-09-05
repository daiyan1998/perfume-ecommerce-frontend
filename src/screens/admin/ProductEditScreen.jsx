"use client";
import Loading from "@/components/Loading";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "@/slices/productsApiSlice";
import { Close } from "@mui/icons-material";
import {
  Alert,
  Button,
  CardHeader,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [category, setCategory] = useState("");
  const router = useRouter();
  const [uploadImgUrl, setUploadImgUrl] = useState("");
  const [image, setImage] = useState("");

  // Redux calls
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUploadImg }] =
    useUploadProductImageMutation();

  // Handlers and function
  const categoryChange = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const updatedProduct = {
      productId,
      name: data.get("name"),
      brand: data.get("brand"),
      description: data.get("description"),
      image: data.get("image"),
      category: data.get("category"),
      priceByMl: [
        {
          ml: data.get("ml1"),
          price: data.get("price1"),
        },
        {
          ml: data.get("ml2"),
          price: data.get("price2"),
        },
        {
          ml: data.get("ml3"),
          price: data.get("price3"),
        },
      ],
    };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error?.data?.message);
    } else {
      toast.success("Product Updated");
      router.push("/admin/productlist");
    }
  };

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setUploadImgUrl(imageURL);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container sx={{ mb: 5 }}>
      <Link href="/admin/productlist">
        <Button variant="contained">Go back</Button>
      </Link>
      <Typography variant="h4" mt={3} mb={3}>
        Edit Products
      </Typography>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Alert severity="error">{error?.data?.message || error?.error}</Alert>
      ) : (
        <Box
          onSubmit={submitHandler}
          component="form"
          sx={{ "& .MuiTextField-root": { mb: 2 } }}
        >
          <Stack maxWidth="880px" m="auto" gap="40px">
            <Paper>
              <CardHeader
                title="Details"
                subheader="Title, short description, image..."
              />
              <Divider />
              <Stack p={2} direction="column">
                <TextField
                  label="Name"
                  name="name"
                  defaultValue={product.name}
                />
                <TextField
                  label="Brand"
                  name="brand"
                  defaultValue={product.brand}
                />
                <TextField
                  label="Description"
                  name="description"
                  defaultValue={product.description}
                />
                <TextField
                  label="Image URL"
                  name="image"
                  defaultValue={product.image}
                />
                <TextField
                  label="Category"
                  name="category"
                  defaultValue={product.category}
                />
                {/* TODO: Upload image with cloudinary */}
                {/* <Stack>
                  <Typography variant="h6">Images</Typography>
                  <Box display="flex" flexDirection="column" gap={3}>
                    <Box
                      component="label"
                      role="presentation"
                      tabIndex={0}
                      sx={{ cursor: "pointer" }}
                    >
                      <input
                        type="file"
                        tabIndex={-1}
                        name="uploadimg"
                        multiple
                        hidden
                        // value={image}
                        onChange={uploadFileHandler}
                      />
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        gap="20px"
                        bgcolor="#F6F7F8"
                        p="50px"
                        borderRadius="10px"
                      >
                        <Image
                          src="/upload-file.svg"
                          height={50}
                          width={50}
                          alt="upload svg"
                        />
                        <Stack textAlign="center" gap="16px">
                          <Box fontSize="1.125rem" fontWeight="600">
                            Drop or select file
                          </Box>
                          <Box>
                            Drop files here or click to
                            <Box
                              component="span"
                              color="#00A76F"
                              sx={{
                                textDecoration: "underline",
                                margin: "0 5px",
                              }}
                            >
                              browse
                            </Box>
                            through your machine.
                          </Box>
                        </Stack>
                      </Box>
                    </Box>
                    {uploadImgUrl && (
                      <Box position="relative" height="140px" width="140px">
                        <Image src={uploadImgUrl} fill />
                        <IconButton
                          sx={{
                            bgcolor: "white",
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                          }}
                          onClick={() => setUploadImgUrl(null)}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Stack> */}
              </Stack>
            </Paper>
            {/* pricing */}
            <Paper>
              <CardHeader title="Pricing" subheader="Price related inputs" />
              <Divider />
              <Stack p={2} direction="row" justifyContent="center" gap="20px">
                {product.priceByMl.map((x, i) => (
                  <Stack key={i}>
                    <Typography variant="caption" align="center">
                      Varient {i + 1}
                    </Typography>
                    <TextField
                      name={`ml${i + 1}`}
                      label="Ml"
                      defaultValue={x.ml}
                      type="number"
                      required
                    />
                    <TextField
                      name={`price${i + 1}`}
                      label="Price"
                      defaultValue={x.price}
                      type="number"
                      required
                    />
                  </Stack>
                ))}
              </Stack>
            </Paper>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default ProductEditScreen;

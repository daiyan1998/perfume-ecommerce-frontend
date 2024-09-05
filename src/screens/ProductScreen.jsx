"use client";
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "next/navigation";
import { useGetProductDetailsQuery } from "@/slices/productsApiSlice";
import Loading from "@/components/Loading";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { addToCart } from "@/slices/cartSlice";
import { useDispatch } from "react-redux";
import ProductDesc from "@/components/productScreen/ProductDesc";

const ProductScreen = () => {
  const [price, setPrice] = useState("");
  const [ml, setMl] = useState(null);

  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();

  // @desc Fetch product details based on the ID.
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const increaseQuantity = () => {
    setQty(qty + 1);
  };

  const decreaseQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const addToCartHandler = () => {
    let cartUniqueId = `${product._id}-${ml}`;
    dispatch(addToCart({ ...product, qty, price, ml, cartUniqueId }));
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container sx={{ mt: 10 }}>
          <Grid container columnSpacing={3} rowSpacing={{ xs: 5 }}>
            <Grid item sm={6}>
              <Image
                height={400}
                width={400}
                src={product.image}
                style={{ objectFit: "contain", width: "100%" }}
                priority={false}
                alt="perfume bottle"
                loading="lazy"
              />
            </Grid>
            <Grid item sm={6}>
              <Stack gap={2}>
                <Typography variant="h4">
                  {product.name} | ইলিট কাস্তারী আতর
                </Typography>
                <Typography color="primary" variant="h5" gutterBottom>
                  440.00৳ - 1140.00৳
                </Typography>
                <Typography>
                  এতে আপনি কস্তুরির সাথে অন্যান্য নোটস ও পাবেন, যেটা ইউনিক,অন্য
                  কস্তুরি বেসড আতরের তুলনায়। একটু পর পর নিজের স্মেল প্রোফাইল
                  চেঞ্জ করে আমাদের এই কস্তুরি ইলিট। কখনো কস্তুরির মিষ্টি স্মেল,
                  কখনো হালকা ফ্লোরাল নোটস, কখনো স্মোকি নোটস। কস্তুরি বেসড সেমি
                  অর্গানিক আতরের মধ্যে এটি নির্দ্বিধায় অন্যতম সেরা। লঞ্জেভিটি
                  অনেক ভালো, প্রোজেকশন ও চমৎকার।
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel>Quantity</InputLabel>
                    {/* selecting perfume price by clicking on ml */}
                    <Select
                      value={price}
                      label="Quantity"
                      onChange={handlePriceChange}
                    >
                      {product.priceByMl.map((x) => {
                        return (
                          <MenuItem
                            key={x.ml}
                            value={x.price}
                            onClick={() => setMl(x.ml)}
                          >
                            {x.ml}ML
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Typography variant="h4">৳{price || 0}</Typography>
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
                  <Button
                    variant="contained"
                    disabled={!ml}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <ProductDesc />
        </Container>
      )}
    </>
  );
};

export default ProductScreen;

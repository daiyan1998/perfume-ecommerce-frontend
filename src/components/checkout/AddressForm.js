"use client";
import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import SimpleCheckoutSteps from "../SimpleCheckoutSteps";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { saveShippingAddress } from "@/slices/cartSlice";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAdress } = cart;
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData = {
      name: data.get("name"),
      address: data.get("address"),
      city: data.get("city"),
      postalCode: data.get("zip"),
      country: data.get("country"),
      email: data.get("email"),
      phoneNumber: data.get("phone"),
    };
    dispatch(saveShippingAddress({ ...formData }));
    router.push("/payment");
  };
  return (
    <>
      <SimpleCheckoutSteps step1 step2 />
      <form onSubmit={submitHandler}>
        <Grid container spacing={3}>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="name" required>
              Name
            </FormLabel>
            <OutlinedInput
              id="name"
              name="name"
              type="name"
              placeholder="Snow"
              autoComplete="name"
              required
            />
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="address" required>
              Address
            </FormLabel>
            <OutlinedInput
              id="address"
              name="address"
              type="address"
              placeholder="Street name and number"
              autoComplete="shipping address-line1"
              required
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="city" required>
              City
            </FormLabel>
            <OutlinedInput
              id="city"
              name="city"
              type="city"
              placeholder="Dhaka"
              autoComplete="City"
              required
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="zip" required>
              Zip / Postal code
            </FormLabel>
            <OutlinedInput
              id="zip"
              name="zip"
              type="zip"
              placeholder="12345"
              autoComplete="shipping postal-code"
              required
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="country" required>
              Country
            </FormLabel>
            <OutlinedInput
              id="country"
              name="country"
              type="country"
              placeholder="Bangladesh"
              autoComplete="shipping country"
              required
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="email" required>
              Email Address
            </FormLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              placeholder="abc@gmail.com"
              required
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="phone" required>
              Phone Number
            </FormLabel>
            <OutlinedInput
              id="phone"
              name="phone"
              type="phone"
              placeholder=""
              required
            />
          </FormGrid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Continue
        </Button>
      </form>
    </>
  );
}

"use client";
import ProductCard from "@/components/Shared/ProductCard";
import { useGetProductsQuery } from "@/slices/productsApiSlice";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const brandNames = [
  "AromaticAura",
  "MystiqueMusk",
  "TimelessTrails",
  "EternalEssence",
  "SandalwoodSerenade",
  "AmberAffinity",
  "OudOracle",
];

const categoryNames = [
  "Floral",
  "Woody",
  "Spicy Notes",
  "Citrus Blends",
  "Oriental Elixirs",
  "Fruity Infusions",
  "Aquatic Aromas",
  "Exotic",
];

const ShopScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const PriceRangeSlider = () => {
    const [value, setValue] = useState([0, 10]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    );
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <Paper
            sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Box>
              <Typography variant="h6">Price Range</Typography>
              <PriceRangeSlider />
            </Box>
            <hr />
            <Box>
              <Typography variant="h6">Brands</Typography>
              <FormGroup>
                {brandNames.map((brandName) => (
                  <FormControlLabel
                    key={brandName}
                    control={<Checkbox />}
                    label={brandName}
                  />
                ))}
              </FormGroup>
            </Box>
            <hr />
            <Box>
              <Typography variant="h6">Category</Typography>
              <FormGroup>
                {categoryNames.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={<Checkbox />}
                    label={category}
                  />
                ))}
              </FormGroup>
            </Box>
          </Paper>
        </Grid>
        <Grid
          container
          item
          md={8}
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={3}
        >
          {isLoading ? (
            <Typography>Loading</Typography>
          ) : (
            products?.map((product, i) => (
              <Grid key={i} item md={4}>
                <ProductCard product={product} isLoading={isLoading} />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopScreen;

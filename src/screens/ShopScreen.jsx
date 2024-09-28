"use client";
import ProductCard from "@/components/Shared/ProductCard";
import { useGetProductsQuery } from "@/slices/productsApiSlice";
import {
  Alert,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { useRouter, useSearchParams } from "next/navigation";

const brandNames = [
  "Aromatic Aura",
  "Mystique Musk",
  "Timeless Trails",
  "Eternal Essence",
  "Sandalwood Serenade",
  "Amber Affinity",
  "Oud Oracle",
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
  const router = useRouter();
  const [pageNumber, setPageNumber] = React.useState(1);
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });
  const { products, pages } = data || {};
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

  // Pagination
  const handlePageChange = (e, value) => {
    setPageNumber(value);
    router.push(`/shop?page=${value}`);
  };

  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item md={3} xs={12} display={{ md: "block", xs: "none" }}>
            <Paper
              sx={{
                p: 3,
                display: { md: "flex", xs: "none" },
                flexDirection: "column",
                gap: 3,
                position: {
                  md: "fixed",
                },
                width: { md: "250px", xs: "100%" },
                height: "80vh",
                overflow: "auto",
              }}
            >
              <NestedList products={products} />
            </Paper>
          </Grid>
          <Grid container item md={9} spacing={3}>
            <>
              {isLoading && (
                <>
                  {Array.from({ length: 5 }).map((product, i) => (
                    <Grid key={i} item xs={12} md={4} sm={6}>
                      <SkeletonCard />
                    </Grid>
                  ))}
                </>
              )}
              {products?.map((product, i) => (
                <Grid key={i} item xs={12} md={4} sm={6}>
                  <ProductCard product={product} isLoading={isLoading} />
                </Grid>
              ))}
            </>
            <Grid item xs={12}>
              <Pagination
                count={pages}
                page={pageNumber}
                sx={{ ml: "auto", p: 3 }}
                onChange={handlePageChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

function NestedList({ products }) {
  const [openBrand, setOpenBrand] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);

  const handleBrandClick = () => {
    setOpenBrand(!openBrand);
  };

  const handleCategoryClick = () => {
    setOpenCategory(!openCategory);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filter Products
        </ListSubheader>
      }
    >
      {/* <Box>
        <Typography variant="h6">Price Range</Typography>
        <PriceRangeSlider />
      </Box> */}
      {/* Brand */}
      <ListItemButton onClick={handleBrandClick}>
        <ListItemText primary="Brand" />
        {openBrand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openBrand} timeout="auto" unmountOnExit>
        <List component="div">
          <FormGroup sx={{ pl: 3 }}>
            {brandNames.map((brand) => (
              <FormControlLabel
                key={brand}
                control={<Checkbox />}
                label={brand}
              />
            ))}
          </FormGroup>
        </List>
      </Collapse>
      {/* Category */}
      <ListItemButton onClick={handleCategoryClick}>
        <ListItemText primary="Category" />
        {openCategory ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCategory} timeout="auto" unmountOnExit>
        <List component="div">
          <FormGroup sx={{ pl: 3 }}>
            {categoryNames.map((category) => (
              <FormControlLabel
                key={category}
                control={<Checkbox />}
                label={category}
              />
            ))}
          </FormGroup>
        </List>
      </Collapse>
    </List>
  );
}

export default ShopScreen;

import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import SkeletonCard from "../ui/SkeletonCard";

const ProductCard = ({ product, isLoading }) => {
  const { name, priceRange, image, _id, priceByMl } = product;

  if (isLoading) return <SkeletonCard />;

  return (
    <Card>
      <Box
        sx={{
          position: "relative",
          "&:hover": {
            "& .overLay": {
              opacity: 1,
            },
            "& .overLayButton": {
              height: "35px",
              opacity: 1,
            },
          },
        }}
      >
        <Link href={`/product/${_id}`}>
          <CardMedia
            sx={{
              height: 250,
            }}
            image={image}
          />
        </Link>
      </Box>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography color="secondary.">{name}</Typography>
        <Typography fontSize={20} sx={{ fontWeight: "700" }} gutterBottom>
          ৳{priceByMl[0].price} - ৳{priceByMl[priceByMl.length - 1].price}
        </Typography>
        <Link href={`/product/${_id}`}>
          <Button variant="contained" fullWidth>
            View More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

// ProductCard.propTypes = {
//   product: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     priceRange: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     _id: PropTypes.string.isRequired,
//   }),
// };

export default ProductCard;

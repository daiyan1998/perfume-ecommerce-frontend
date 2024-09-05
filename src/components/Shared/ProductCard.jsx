import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import Link from "next/link";

const ProductCard = ({ product, isLoading }) => {
  const { name, priceRange, image, _id, priceByMl } = product;

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
          {isLoading ? (
            <Skeleton
              sx={{ height: 250 }}
              animation="wave"
              variant="rectangular"
            />
          ) : (
            <CardMedia
              sx={{
                height: 250,
              }}
              image={image}
            />
          )}
        </Link>
      </Box>
      <CardContent sx={{ textAlign: "center" }}>
        {isLoading ? (
          <Skeleton animation="wave" />
        ) : (
          <Typography color="secondary.">{name}</Typography>
        )}
        {isLoading ? (
          <Skeleton animation="wave" sx={{ fontSize: 20, fontWeight: "700" }} />
        ) : (
          <Typography fontSize={20} sx={{ fontWeight: "700" }} gutterBottom>
            ৳{priceByMl[0].price} - ৳{priceByMl[priceByMl.length - 1].price}
          </Typography>
        )}
        {isLoading ? (
          <Skeleton sx={{ height: "3.5rem" }} />
        ) : (
          <Link href={`/product/${_id}`}>
            <Button
              variant="contained"
              // color="secondary"
              fullWidth
              // sx={{
              //   ":hover": {
              //     bgcolor: "black",
              //     color: "white",
              //   },
              // }}
            >
              View More
            </Button>
          </Link>
        )}
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

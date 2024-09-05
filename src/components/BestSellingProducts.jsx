"use client";
import React from "react";
import { useGetProductsQuery } from "@/slices/productsApiSlice";
import { Box, Typography } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "./Shared/ProductCard";

const BestSellingProducts = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      <Typography variant="h4" textAlign="center" my={5}>
        Best Selling Products
      </Typography>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination]}
        style={{ padding: "1rem 0" }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {isLoading
          ? [1, 2, 3, 4].map((product) => (
              <SwiperSlide key={product}>
                <ProductCard product={product} isLoading={isLoading} />
              </SwiperSlide>
            ))
          : products?.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} isLoading={isLoading} />
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
};

export default BestSellingProducts;

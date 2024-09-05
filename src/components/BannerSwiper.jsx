"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Banner from "./Banner";
import DiegoMolina from "../../public/banner/diegoMolina.jpg";
import VersaceBlack from "../../public/banner/versaceBlack.jpg";
import WhitePerfume from "../../public/banner/whitePerfume.jpg";

const imgURL = [DiegoMolina, VersaceBlack, WhitePerfume];

export default function BannerSwiper() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {imgURL.map((imgUrl) => (
          <SwiperSlide key={imgUrl.src}>
            <Banner imgUrl={imgUrl.src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

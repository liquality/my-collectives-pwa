import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

export default function HorizontalSwipe() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <div className="swiper-container">
          <SwiperSlide>
            <div className="card-img-swiper">
              {" "}
              <img
                className="swiper-item-img"
                alt="NFT Image"
                /*    style={{ display: loading ? "none" : "block" }} */
                src="https://ipfs.io/ipfs/bafybeihywodccwwggeoc5rxk3v3dbdwpqxyacku2zla5xf5i5hhoqpkafy"
                /*        onLoad={() => setLoading(false)}
                onError={() => setLoading(false)} */
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </div>
      </Swiper>
    </>
  );
}

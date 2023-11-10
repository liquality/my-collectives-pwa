import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import SwipeCard from "./SwipeCard";
import { PageLoadingIndicator } from "../PageLoadingIndicator";

export default function HorizontalSwipe() {
  const { challenges, loading } = useGetChallenges();

  return (
    <>
      {loading || !challenges ? (
        <PageLoadingIndicator />
      ) : (
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
            {challenges.map((challenge: any, index: number) => (
              <SwiperSlide key={index}>
                <SwipeCard {...challenge} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      )}
    </>
  );
}

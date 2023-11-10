import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import SwipeCard from "./SwipeCard";
import { PageLoadingIndicator } from "../PageLoadingIndicator";

interface HorizontalSwipeProps {
  imageData: any; //TODO decide what types of object more than challenges can be here
  loading: boolean;
}
export default function HorizontalSwipe(props: HorizontalSwipeProps) {
  const { imageData, loading } = props;

  return (
    <>
      {loading || !imageData ? (
        <PageLoadingIndicator />
      ) : (
        <Swiper
          slidesPerView={2.3}
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
            {imageData.map((challenge: any, index: number) => (
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

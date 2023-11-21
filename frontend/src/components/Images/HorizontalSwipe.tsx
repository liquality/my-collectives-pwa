import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import SwipeCard from "./SwipeCard";
import { PageLoadingIndicator } from "../PageLoadingIndicator";
import { isPlatform } from "@ionic/react";
import { Challenge } from "@/types/challenges";

interface HorizontalSwipeProps {
  imageData: any; //TODO decide what types of object more than challenges can be here
  loading: boolean;
  setSelectedChallenge?: (challenge: Challenge) => void;
  selectedChallenge?: Challenge;
}
export default function HorizontalSwipe(props: HorizontalSwipeProps) {
  const { imageData, loading, setSelectedChallenge, selectedChallenge } = props;

  return (
    <>
      {loading || !imageData ? (
        <PageLoadingIndicator />
      ) : (
        <Swiper
          slidesPerView={isPlatform("desktop") ? 10 : 2.3}
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
                <SwipeCard
                  selectedChallenge={selectedChallenge}
                  setSelectedChallenge={setSelectedChallenge}
                  {...challenge}
                  challenge={challenge}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      )}
    </>
  );
}

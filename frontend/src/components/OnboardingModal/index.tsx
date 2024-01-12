import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from "swiper/modules";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonicSlides,
} from "@ionic/react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/react/css/ionic-swiper.css";
import { useState, useEffect } from "react";

const OnboardingModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dismiss = () => {
    localStorage.setItem("groupMints.onboardingShowed", "true");
    setIsOpen(false);
  };
  useEffect(() => {
    const checkShowed = () => {
      if (!isOpen) {
        const onboardingShowed = localStorage.getItem(
          "groupMints.onboardingShowed"
        );
        if (!onboardingShowed) {
          setIsOpen(true);
        }
      }
    };
    checkShowed();
  }, [isOpen]);

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => dismiss()} strong={true}>
              Skip
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Swiper
          modules={[
            Autoplay,
            Keyboard,
            Pagination,
            Scrollbar,
            Zoom,
            IonicSlides,
          ]}
          autoplay={true}
          keyboard={true}
          pagination={true}
          scrollbar={true}
          zoom={true}
          slidesPerView={1}
          loop={true}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
      </IonContent>
    </IonModal>
  );
};

export default OnboardingModal;

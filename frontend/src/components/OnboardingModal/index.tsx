import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInterface } from "swiper";
import { Keyboard, Pagination, EffectFade } from "swiper/modules";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonModal,
  IonRow,
  IonTitle,
} from "@ionic/react";
import "swiper/css";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "@ionic/react/css/ionic-swiper.css";
import { useState, useEffect } from "react";

const OnboardingModal: React.FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();
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
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonTitle>MyCollective.tech</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p className="ion-text-center">
                Discover, Mint & Earn with Friends
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Swiper
                className="onboarding-swiper"
                onSwiper={(swiper) => setSwiperInstance(swiper)}
                modules={[Keyboard, Pagination, EffectFade]}
                keyboard={true}
                pagination={true}
                slidesPerView={1}
                loop={false}
              >
                <SwiperSlide className="onboarding-slide">
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        Minting in Collectives and powering referrals makes
                        sharing fun, boosts virality, and offers opportunities
                        to earn.
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </SwiperSlide>
                <SwiperSlide className="onboarding-slide">
                  <IonGrid>
                    <IonRow>
                      <IonCol size="auto">
                        <p className="ion-text-left">
                          <b>How it works:</b>
                        </p>
                        <ul className="ion-text-left">
                          <li>
                            Join a Collective and discover unique Collectibles{" "}
                          </li>
                          <li>Collaboratively Mint and Promote them </li>
                          <li>Grow your personal collection </li>
                          <li>Earn Collective member benefits</li>
                        </ul>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </SwiperSlide>
                <SwiperSlide className="onboarding-slide">
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <p>
                          <b>Add to Home Screen</b>
                        </p>
                        <p>
                          To install the Collective app, you need to add this
                          website to your home screen.
                        </p>

                        <p>
                          In your Safari browser menu tap the Share icon and
                          choose Add to Home Screen. Then open the Collective
                          app on your home screen.
                        </p>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </SwiperSlide>
              </Swiper>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto" className="ion-align-self-center">
              <IonButton
                fill="outline"
                shape="round"
                disabled={(swiperInstance?.activeIndex || 0) >= 2}
                onClick={() => swiperInstance?.slideNext()}
                strong={true}
              >
                Next
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto" className="ion-align-self-center">
              <IonButton
                fill="clear"
                shape="round"
                onClick={() => dismiss()}
                strong={true}
              >
                Skip
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default OnboardingModal;

import { IonContent, IonPage } from "@ionic/react";

import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { RouteComponentProps } from "react-router";
import DiscoverTopBar from "./DiscoverTopBar";
import PageSearchBar from "@/components/PageSearchBar";

const About: React.FC<RouteComponentProps> = (routerProps) => {
  const { challenges, loading } = useGetChallenges();
  //TODO: change parent tag to IonPage
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <DiscoverTopBar {...routerProps}>
          <PageSearchBar searchEnabled={false} reloadEnabled={false} />
        </DiscoverTopBar>
        <div className="flexDirectionCol mb-1">
          <h4>How it Works</h4>
          <ul className="bullet-points">
            <li>Lorem ipsum dolor gauorn ketrada.</li>
            <li>adipiscing elit haieorty greqa.</li>
            <li>Donec tincidunt odio.</li>
          </ul>
        </div>
        <div className="pink-line mb-1"></div>

        <div className="flexDirectionCol mb-1">
          <h4>1. Join a Collective</h4>
          <ul className="bullet-points">
            <li>
              Discover unique collectibles by joining a collective. This step is
              all about exploring and finding interesting items.
            </li>
          </ul>
        </div>
        <div className="pink-line"></div>

        <div className="flexDirectionCol mb-1">
          <h4>2. Collaborative Minting & Promotion</h4>
          <ul className="bullet-points">
            <li>Mint your collectibles as part of the group.</li>
            <li>Minting is a key way to contribute to the group.</li>
            <li>The more you mint, the more you contribute.</li>
            <li> Lorem Ipsum hej hej</li>
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;

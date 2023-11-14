import { IonContent, IonPage } from "@ionic/react";

import useGetChallenges from "@/hooks/Challenges/useGetChallenges";

const About: React.FC = () => {
  const { challenges, loading } = useGetChallenges();
  //TODO: change parent tag to IonPage
  return (
    <IonContent>
      <h4 className="mb-3">A Guide to How it Works</h4>
      <div className="pink-line mb-1"></div>

      <div className="flexDirectionCol mb-1">
        <h4>1. Join a Collective</h4>
        <p className="bullet-points">
          Discover unique collectibles by joining a collective. This step is all
          about exploring and finding interesting items.{" "}
        </p>
      </div>
      <div className="pink-line"></div>

      <div className="flexDirectionCol mb-1">
        <h4>2. Collaborative Minting & Promotion</h4>
        <p className="bullet-points ">
          • Mint your collectibles as part of the group
        </p>
        <p className="bullet-points ">
          • Minting is a key way to contribute to the group.{" "}
          <p className="mr-1 bullet-points ">
            The more you mint, the more you contribute.{" "}
          </p>
        </p>
        <p className="bullet-points minimal-line-height">
          • Lorem Ipsum hej hej
        </p>
      </div>
    </IonContent>
  );
};

export default About;

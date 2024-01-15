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
          <h4>Here is a guide on how it works:</h4>
        </div>
        {/*         <div className="pink-line mb-1"></div>
         */}
        <div className="flexDirectionCol mb-1">
          <h4>1. Join a Collective</h4>
          <ul className="bullet-points">
            Discover unique collectibles by joining a collective. This step is
            all about exploring and finding interesting items.
          </ul>
        </div>
        {/*         <div className="pink-line"></div>
         */}
        <div className="flexDirectionCol ">
          <h4>2. Collaborative Minting & Promotion</h4>
          <ul className="bullet-points">
            The more you mint, the more you contribute. Promote collectibles
            within your group and on social media platforms. This increases the
            chances of your collectibles being minted more, earning the group
            credits.
          </ul>
        </div>

        <div className="flexDirectionCol ">
          <h4>3. Grow Your Collection:</h4>
          <ul className="bullet-points">
            As you participate in the collective, you can grow your personal
            collection of unique items.
          </ul>
        </div>

        <div className="flexDirectionCol ">
          <h4>4. Earn Benefits:</h4>
          <ul className="bullet-points">
            Get rewarded if your collective is the group which minted most.
          </ul>
        </div>

        <div className="flexDirectionCol ">
          <h4>5. Start Your Own Group:</h4>
          <ul className="bullet-points">
            If you find a piece that isn’t part of your current group, you have
            two options:
            <li>Add it to your existing group.</li>
            <li>
              Start your own group, focusing on this new collectible and others
              in the future.
            </li>
          </ul>
        </div>

        <div className="flexDirectionCol">
          <h4>6. Grow Your Collection:</h4>
          <ul className="bullet-points">
            As you participate in the collective, you can grow your personal
            collection of unique items.
          </ul>
        </div>

        <div className="flexDirectionCol ">
          <h4>7. Lead and Engage:</h4>
          <ul className="bullet-points">
            As a group leader, you can make your collectibles stand out. Engage
            members through chat and promote the pieces for minting.<br></br>{" "}
            <br></br> ... and remember, mints you promote are linked to your
            collective, even when they are minted by non-members, increasing the
            reward, if your groups wins the top-fan prize. Happy collecting!
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;

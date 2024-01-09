import { Challenge } from "@/types/challenges";
import {
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonButton,
  IonIcon,
} from "@ionic/react";

export interface InfoSheetModalMintActivityProps {
  challenge: Challenge;
}

const InfoSheetModalOverview: React.FC<InfoSheetModalMintActivityProps> = (
  props: InfoSheetModalMintActivityProps
) => {
  const { challenge } = props;
  return (
    <IonList lines="full">
      <IonListHeader>
        <IonLabel className="challenge-info-list-title">Description</IonLabel>
      </IonListHeader>
      <IonItem>
        <div className="challenge-info-list-content">
          {challenge?.description ?? challenge?.name}
        </div>
      </IonItem>

      <IonItem>
        <IonButton fill="clear" color="primary" href="#">
          View On Explorer
          <IonIcon slot="end" src="/assets/icons/arrow-outside.svg" />
        </IonButton>
      </IonItem>
      <IonItem>
        <IonButton fill="clear" color="primary" href="#">
          View On Open Sea
          <IonIcon slot="end" src="/assets/icons/arrow-outside.svg" />
        </IonButton>
      </IonItem>
      <IonListHeader>
        <IonLabel className="challenge-info-list-title">Creator</IonLabel>
      </IonListHeader>
      <IonItem>
        <div className="challenge-info-list-content">
          CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and
          became one of the inspirations for the ERC-721 standard. They have
          been featured in places like The New York Times, Christie’s of London,
          Art|Basel Miami, and The PBS NewsHour.
        </div>
      </IonItem>
    </IonList>
  );
};

export default InfoSheetModalOverview;

import useGetMintActivity from "@/hooks/Challenges/useGetMintActivity";
import { Challenge } from "@/types/challenges";
import { shortenAddress } from "@/utils";
import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";

export interface InfoSheetModalMintActivityProps {
  challenge: Challenge;
}

const InfoSheetModalMintActivity: React.FC<InfoSheetModalMintActivityProps> = (
  props: InfoSheetModalMintActivityProps
) => {
  const { challenge } = props;
  const { network, tokenId, mintingContractAddress } = challenge;
  const { mintActivity, loading } = useGetMintActivity(
    mintingContractAddress,
    network,
    tokenId ?? ""
  );
  return (
    <IonGrid className="ion-padding">
      <IonRow>
        <IonCol size="6" className="ion-text-uppercase">
          Contributors
        </IonCol>
        <IonCol size="4" className="ion-text-uppercase">
          Amount
        </IonCol>
        <IonCol size="2" className="ion-text-uppercase">
          Total
        </IonCol>
      </IonRow>
      {mintActivity?.map((mint: any) => (
        <IonRow>
          <IonCol size="6">{shortenAddress(mint.address)} </IonCol>
          <IonCol size="4">
            <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>{" "}
            {mint.totalCount}
          </IonCol>
          <IonCol size="2">{mint.amount?.totalNative ?? "?"}</IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default InfoSheetModalMintActivity;

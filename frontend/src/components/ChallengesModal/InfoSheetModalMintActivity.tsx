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
        <IonCol size="8" className="ion-text-uppercase">
          Collectors
        </IonCol>
        <IonCol size="4" className="ion-text-uppercase">
          Mints
        </IonCol>
      </IonRow>
      {mintActivity?.map((mint: any) => (
        <IonRow>
          <IonCol size="8">{shortenAddress(mint.address)} </IonCol>
          <IonCol size="4">
            {" "}
            <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>{" "}
            {mint.totalCount}
          </IonCol>
          {/* volume: {mint.amount?.totalNative ?? "?"} */}
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default InfoSheetModalMintActivity;

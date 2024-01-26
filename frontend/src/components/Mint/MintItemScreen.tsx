import { Challenge } from "@/types/challenges";
import {
  convertIpfsImageUrl,
  cutOffTooLongString,
  shortenAddress,
} from "@/utils";
import { IonContent } from "@ionic/react";
import React, { useState } from "react";
import MintItemContent from "./MintItemContent";
import MintItemResult from "./MintItemResult";
import { MintResult } from "@/types/mint";

export interface MintItemScreenProps {
  challenge: Challenge;
}

const MintItemScreen: React.FC<MintItemScreenProps> = ({
  challenge,
}: MintItemScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MintResult | null>({
    success: true,
    group: {
      id: "195c23d0-9809-492f-966a-517a50b182da",
      name: "test",
      description: "test",
      publicAddress: "0x8Ca2393A4f87288830513e3E1eAbF93634955C67",
      walletAddress: "0x1b70b686dD29b980dd66866566ec43Fd4e7d41F8",
      nonceKey: BigInt(622115622129835),
      createdAt: new Date("2024-01-26T17:27:37.337Z"),
      createdBy: "9582a13f-ceab-4f3d-b394-70aa8549ab2f",
      mintCount: 0,
      memberCount: 0,
      poolsCount: 0,
      messagesCount: 0,
      activePoolsCount: 0,
    },
  });
  return (
    <IonContent>
      {result ? (
        <MintItemResult challenge={challenge} result={result} />
      ) : (
        <MintItemContent challenge={challenge} setResult={setResult} />
      )}
    </IonContent>
  );
};

export default MintItemScreen;

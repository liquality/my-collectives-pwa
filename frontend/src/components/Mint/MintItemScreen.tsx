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
  const [result, setResult] = useState<MintResult | null>(null);

  console.log(challenge, "CHALLENGE START");
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

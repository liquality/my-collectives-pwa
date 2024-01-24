import { Group } from "@/types/general-types";
import { IonSpinner, IonText } from "@ionic/react";
import { group } from "console";
import { useEffect, useState } from "react";

export interface WithdrawalButtonProps {
  group: Group;
  loadingWithdrawal: boolean;
  handleWithdrawRewards: (group: Group) => void;
}

const WithdrawalButton: React.FC<WithdrawalButtonProps> = ({
  group,
  loadingWithdrawal,
  handleWithdrawRewards,
}) => {
  useEffect(() => {}, [loadingWithdrawal]);
  return (
    <>
      {loadingWithdrawal ? (
        <IonSpinner
          style={{
            width: 13,
            height: 13,
          }}
          color="primary"
          name="circular"
        ></IonSpinner>
      ) : (
        <IonText
          color="primary"
          style={{ cursor: "pointer" }}
          onClick={() => handleWithdrawRewards(group)}
        >
          Withdraw
        </IonText>
      )}
      {" | "}
    </>
  );
};

export default WithdrawalButton;

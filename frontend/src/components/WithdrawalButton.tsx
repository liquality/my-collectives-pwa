import { IonSpinner, IonText } from "@ionic/react";
import { group } from "console";
import { useEffect, useState } from "react";

export interface WithdrawalButtonProps {
  loadingWithdrawal: boolean;
  handleWithdrawRewards: (group: any) => void;
}

const WithdrawalButton: React.FC<WithdrawalButtonProps> = ({
  loadingWithdrawal,
  handleWithdrawRewards
}) => {
  const [canWithdraw, setCanWithdraw] = useState(false);
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

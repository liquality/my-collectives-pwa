import { shortenAddress } from "@/utils/adddress";
import {
  IonButton,
  IonContent,
  IonPopover,
  IonIcon,
  IonSpinner,
  IonItem,
  IonList,
  IonLabel,
  isPlatform,
  IonChip,
} from "@ionic/react";
import { logIn, logOut, wallet } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useBalance, useContractRead, useDisconnect } from "wagmi";
import { Auth } from "@/utils";
import { useDisplayEns } from "@/hooks/useDisplayEns";
import { goerli, mainnet } from "viem/chains";
import { fetchBalance, erc20ABI, FetchBalanceResult } from "@wagmi/core";
import { setBalance } from "viem/_types/actions/test/setBalance";

const ConnectButton: React.FC = () => {
  
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { ens } = useDisplayEns(address);
  /*   
TODO: investigate why this wont work
const connectedBalance = useBalance({
    address: address,
    chainId: 42161,
  }); */
  const [balance, setBalance] = useState<any | null>(null);

  //Temporary fix since wagmi is not returining the right balance
  useEffect(() => {
    const fetchData = async () => {
      if (address && !balance) {
        try {
          const apiKey = "freekey";
          const apiUrl = `https://goerli-api.ethplorer.io/getAddressInfo/${address}?apiKey=${apiKey}`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          setBalance(data.ETH.balance.toString());
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchData();
  }, [balance, address]);

  const logout = () => {
    Auth.clearAccessToken();
    disconnect();
  };

  const login = async () => {
    try {
      await open();
    } catch (error) {
      console.error(error);
      // TODO: show error message to the users
    }
  };
  
  
  return (
    <>
      {isDisconnected ? (
        <IonChip color="primary" onClick={login}>
          {isConnecting ? <IonSpinner name="circular" /> : <>Connect</>}
        </IonChip>
      ) : (
        <>
          <IonChip
            color="primary"
            className="logged-in-button"
            outline={true}
            id="logout-options-triggger"
          >
            <IonLabel className="address">
              {ens ? ens : shortenAddress(address || "")}
            </IonLabel>
            <div className="divider"></div>
            <IonLabel className="balance">{balance?.slice(0, 6)} ETH</IonLabel>
          </IonChip>
          <IonPopover
            size="auto"
            trigger="logout-options-triggger"
            dismissOnSelect={true}
            showBackdrop={false}
          >
            <IonContent className="ion-padding">
              <IonList lines="none">
                <IonItem button={true} detail={false} onClick={logout}>
                  <IonLabel>Logout</IonLabel>
                  <IonIcon slot="end" icon={logOut}></IonIcon>
                </IonItem>
              </IonList>
            </IonContent>
          </IonPopover>
        </>
      )}
    </>
  );
};

export default ConnectButton;

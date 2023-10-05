import { EmbeddedWallet, AbstractClientWallet } from "@thirdweb-dev/wallets";
import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  BaseGoerli as ActiveChain,
  updateChainRPCs,
} from "@thirdweb-dev/chains";
import { IonLoading } from "@ionic/react";

interface WalletState {
  connected: boolean;
  connectedWallet?: AbstractClientWallet;
  walletLoading: boolean;
  setConnectedWallet(wallet: any): void;
  setConnected(connected: boolean): void;
  setWalletLoading(connected: boolean): void;
}

const defaultWalletState: WalletState = {
  connected: false,
  connectedWallet: undefined,
  walletLoading: false,
  setConnected: () => {},
  setConnectedWallet: () => {},
  setWalletLoading: () => {},
};

const WalletContext = createContext(defaultWalletState);

export const useWalletContext = () => useContext(WalletContext);
export const useConnectedWallet = () =>
  useContext(WalletContext).connectedWallet;

export const WalletProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [walletLoading, setWalletLoading] = useState<boolean>(false);
  const connectedWalletRef = useRef<EmbeddedWallet>();
  const setConnectedWallet = async (wallet: EmbeddedWallet) => {
    setWalletLoading(true);
    connectedWalletRef.current = wallet;
    try {
      const address = await connectedWalletRef.current.autoConnect();
      if (address) {
        setConnected(true);
      }
    } catch (error) {
      console.error(error);
    }
    setWalletLoading(false);
  };

  useEffect(() => {
    const setup = async () => {
      if (!connectedWalletRef.current) {
        setConnectedWallet(
          new EmbeddedWallet({
            chain: updateChainRPCs(ActiveChain),
            clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || "",
            styles: {
              colorBackground: '#302e78',
              colorText: '#ffffff',
              colorPrimary: '#ffffff',
            }
          })
        );
      }
    };
    setup();
  });

  return (
    <WalletContext.Provider
      value={{
        connected,
        setConnected,
        connectedWallet: connectedWalletRef.current,
        setConnectedWallet,
        walletLoading,
        setWalletLoading,
      }}
    >
      {walletLoading ? 
      <IonLoading isOpen={true} spinner="circular" /> : children }
    </WalletContext.Provider>
  );
};

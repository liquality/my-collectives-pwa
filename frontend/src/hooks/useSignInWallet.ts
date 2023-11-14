import ApiService from "@/services/ApiService";
import { useState, useEffect } from "react";
import {
  ConnectorData,
  useAccount,
  useDisconnect,
  useSignMessage,
  useWalletClient,
} from "wagmi";

export function useSignInWallet() {
  const { address, connector: activeConnector } = useAccount();

  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const {
    data: signedMessage,
    isLoading,
    isSuccess,
    isError,
    signMessage,
  } = useSignMessage();
  const { data: walletClient } = useWalletClient();
  const { disconnect } = useDisconnect();

  // user data
  const getUser = async () => {
    let _user = await ApiService.getUser(address!);
    console.log(_user, 'wats user???')
    if (!_user) {
      // TODO: will need to show a modal / popup
      // to ask for user details for now we are using only the address
      _user = await ApiService.createUser({
        publicAddress: address!,
      });
    }

    if (_user) {
      localStorage.setItem("groupMints.user", JSON.stringify(_user));
      setUser(_user);
    }
  };

  // TODO: check if we need this handler
  useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      if (account) {
        console.log("new account", account);
        localStorage.removeItem("groupMints.accessToken");
        localStorage.removeItem("groupMints.user");
        setIsAuthenticated(false);
        setUser(null);
      } else if (chain) {
        // TODO: will need to validate if we want to use a single chain or not
        console.log("new chain", chain);
      }
    };

    if (activeConnector) {
      activeConnector.on("change", handleConnectorUpdate);
    }

    return () => {
      activeConnector?.off("change", handleConnectorUpdate);
    };
  }, [activeConnector]);

  useEffect(() => {
    if (address) {
      console.log('getting here for getting user?')
      getUser();
    } else {
      setUser(null);
    }
  }, [address]);

  // sign message if we need it
  useEffect(() => {
    const token = localStorage.getItem("groupMints.accessToken");
    if (!token && user && !isAuthenticated && !isLoading && walletClient) {
      signMessage({ message: user.nonce });
    }
  }, [user, isLoading, walletClient]);

  // auth call
  useEffect(() => {
    const login = async () => {
      const token = localStorage.getItem("groupMints.accessToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        const authResult = await ApiService.loginUser(address!, signedMessage!);
        if (authResult?.accessToken) {
          localStorage.setItem(
            "groupMints.accessToken",
            authResult.accessToken
          );
          setIsAuthenticated(true);
        } else {
          getUser();
        }
      }
    };

    if (signedMessage && isSuccess) {
      login();
    } else if (isError) {
      disconnect();
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [signedMessage, isSuccess, isError]);

  return { user };
}

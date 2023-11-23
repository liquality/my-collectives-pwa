import ApiService from "@/services/ApiService";
import { Auth } from "@/utils";
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

  // GET USER DATA
  const getUser = async () => {
    let _user = await ApiService.getUser(address!);
    if (!_user) {
      // TODO: will need to show a modal / popup
      // to ask for user details for now we are using only the address
      _user = await ApiService.createUser({
        publicAddress: address!,
      });
    }

    if (_user) {
      setUser(_user);
    }
  };

  // TODO: check if we need this handler
  // useEffect(() => {
  //   const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
  //     if (account) {
  //       console.log("new account", account);
  //     } else if (chain) {
  //       // TODO: will need to validate if we want to use a single chain or not
  //       console.log("new chain", chain);
  //     }
  //   };

  //   if (activeConnector) {
  //     activeConnector.on("change", handleConnectorUpdate);
  //   }

  //   return () => {
  //     activeConnector?.off("change", handleConnectorUpdate);
  //   };
  // }, [activeConnector]);

  useEffect(() => {
    if (address && !isAuthenticated) {
      if (Auth.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        getUser();
      }
    } else {
      Auth.clearAccessToken();
      setIsAuthenticated(false);
    }
  }, [address]);

  // SIGN MESSAGE FOR AUTH
  useEffect(() => {
    if (
      user &&
      !isAuthenticated &&
      !isLoading &&
      walletClient &&
      !signedMessage
    ) {
      signMessage({ message: user.nonce });
    }
  }, [user, isLoading, walletClient]);

  // LOGIN HTTP CALL
  useEffect(() => {
    const login = async () => {
      if (Auth.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        const authResult = await ApiService.loginUser(address!, signedMessage!);
        if (authResult?.accessToken) {
          Auth.setAccessToken(authResult.accessToken);
          setIsAuthenticated(true);
        } else {
          disconnect();
          setIsAuthenticated(false);
          setUser(null);
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

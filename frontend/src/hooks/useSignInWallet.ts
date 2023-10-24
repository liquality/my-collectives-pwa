import ApiService from "@/services/ApiService";
import { useState, useEffect } from "react";
import { useAccount, useSignMessage, useWalletClient } from "wagmi";

export function useSignInWallet() {
  const { address } = useAccount();
  const [user, setUser] = useState<any>(null);
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();
  const { data: walletClient } = useWalletClient();
  // user data
  useEffect(() => {
    const getUserData = async () => {
      const _user = await ApiService.getUser(address!);
      localStorage.setItem("groupMints.user", JSON.stringify(_user));
      setUser(_user);
    };

    if (address && !user) {
      let userData = localStorage.getItem("groupMints.user");
      if (userData) {
        const _user = JSON.parse(userData!);
        setUser(_user);
      } else {
        getUserData();
      }
    }
  }, [address, user]);

  // sign message if we need it
  useEffect(() => {
    if (user && !isLoading && walletClient) {
      let authToken = localStorage.getItem("groupMints.accessToken");
      if (!authToken) {
        // 3: sign the message if the user is not authenticated
        signMessage({ message: user.nonce.toString() });
      }
    }
  }, [user, isLoading, walletClient]);

  // auth call
  useEffect(() => {
    const login = async () => {
      const authResult = await ApiService.loginUser(address!, data!);
      localStorage.setItem("groupMints.accessToken", authResult.accessToken);
    };

    if (data && address) {
      login();
    }
  }, [data]);

  return { user };
}

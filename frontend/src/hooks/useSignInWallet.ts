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
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const {
    data: signedMessage,
    isLoading,
    isSuccess,
    isError,
    signMessage,
  } = useSignMessage({
    onSuccess: async (data, args) =>
      //console.log(data, 'DATAAA')
      await login(data)
  },);
  const { data: walletClient } = useWalletClient();
  const { disconnect } = useDisconnect();
  //const { address, connector: activeConnector } = useAccount();

  const { isConnected, address } = useAccount({
    onConnect: async ({ address, connector }) =>
      //step one: set authentication
      //step 2: get user
      //step 3: sign message for login
      await handleAllAuthSteps()

  },);
  const handleAllAuthSteps = async () => {
    try {
      // Step 1: Get the user
      const dbUser = await getUser();
      console.log(dbUser, 'DB USER?')
      if (dbUser && !Auth.isAuthenticated) {
        // Step 2: Sign message with the user
        console.log(dbUser.nonce, 'DB USER')
        signMessage({ message: dbUser.nonce })  //Here we are listening to onSuccess using the signMessage hook and then logging in User
      }
      else if (!dbUser) {
        Auth.clearAccessToken();
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Handle errors if any
      console.error('Error during authentication steps:', error);
    }
  };



  const login = async (data: any) => {
    if (Auth.isAuthenticated) {
      setIsAuthenticated(true);
    } else {
      console.log(data, address, 'Data & Address')
      const authResult = await ApiService.loginUser(address!, data);
      console.log(authResult, 'Auth result?')
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



  // GET USER DATA
  const getUser = async () => {
    let dbUser = await ApiService.getUser(address!);
    if (!dbUser) {
      // TODO: will need to show a modal / popup
      // to ask for user details for now we are using only the address
      dbUser = await ApiService.createUser({
        publicAddress: address!,
      });
      return user
    }
    if (dbUser) {
      setUser(dbUser);
      return dbUser
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

  /*   useEffect(() => {
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
    }, [address]); */

  // SIGN MESSAGE FOR AUTH
  /*  useEffect(() => {
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
  
  
     if (signedMessage && isSuccess) {
       login();
     } else if (isError) {
       disconnect();
       setIsAuthenticated(false);
       setUser(null);
     }
   }, [signedMessage, isSuccess, isError]);
  */
  return { user };
} 

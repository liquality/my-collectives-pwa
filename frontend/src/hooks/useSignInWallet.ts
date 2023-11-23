import ApiService from "@/services/ApiService";
import { Auth } from "@/utils";
import { useState, } from "react";
import {
  useAccount,
  useDisconnect,
  useSignMessage,
} from "wagmi";

export function useSignInWallet() {
  const [user, setUser] = useState<any>(null);
  const { signMessage } = useSignMessage({
    //Listen to successfully signed message and login after that
    onSuccess: async (data, args) =>
      await login(data),
    onError: async (error, variables) =>
      //TODO: handle some error here
      console.log(error, 'Error signing message')
  },);
  const { disconnect } = useDisconnect();
  //const { address, connector: activeConnector } = useAccount();

  const { isConnected, address } = useAccount({
    onConnect: async ({ address, connector }) =>
      //step 1: get user
      //step 2: sign message with the user
      //step 3: listen to onSignMessageSuccess and login if message was successfully signed
      await handleAllAuthSteps()

  },);
  const handleAllAuthSteps = async () => {
    try {
      // Step 1: Get the user
      const dbUser = await getUser();
      if (dbUser && !Auth.isAuthenticated) {
        // Step 2: Sign message with the user
        signMessage({ message: dbUser.nonce })  //Here we are listening to onSuccess using the signMessage hook and then logging in User
      }
      else if (!dbUser) {
        Auth.clearAccessToken();

      }
    } catch (error) {
      // Handle errors if any
      console.error('Error during authentication steps:', error);
    }
  };



  const login = async (data: any) => {
    if (Auth.isAuthenticated) {
    } else {
      const authResult = await ApiService.loginUser(address!, data);
      if (authResult?.accessToken) {
        Auth.setAccessToken(authResult.accessToken);
      } else {
        disconnect();
        setUser(null);
      }
    }
  };



  // GET USER DATA
  const getUser = async () => {
    let existingUser = await ApiService.getUser(address!);
    if (!existingUser) {
      // TODO: will need to show a modal / popup
      // to ask for user details for now we are using only the address
      const createdUser = await ApiService.createUser({
        publicAddress: address!,
      });
      setUser(createdUser);
      return createdUser
    }
    else if (existingUser) {
      setUser(existingUser);
      return existingUser
    }

  };

  // --------------------------- Johannas Note: Keeping the old code here in case we need it ------------------------------------
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

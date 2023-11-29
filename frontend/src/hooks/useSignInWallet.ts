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


  return { user };
} 

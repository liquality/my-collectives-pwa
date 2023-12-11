import { useState, useEffect } from "react";
import { Group } from "@/types/general-types";
import ApiService from "@/services/ApiService";
import { useAccount } from "wagmi";

export function useUser() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { address, isConnecting } = useAccount();

  const getUser = async () => {
    let existingUser = await ApiService.getUser(address!);
    console.log(existingUser, "existing user in useUser");
    if (!existingUser) {
      // TODO: will need to show a modal / popup
      // to ask for user details for now we are using only the address
      const createdUser = await ApiService.createUser({
        publicAddress: address!,
      });
      setUser(createdUser);
      return createdUser;
    } else if (existingUser) {
      setUser(existingUser);
      return existingUser;
    }
  };

  useEffect(() => {
    // Fetch groups on component mount and whenever the address changes
    console.log(user, address, "user and adddress in useUser");
    if (!user && address) {
      getUser();
    }
  }, [user, address]);

  return { user };
}

export default useUser;

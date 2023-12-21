import { useState, useEffect, useMemo } from "react";
import { Message } from "@/types/general-types";
import ApiService from "@/services/ApiService";
import { createMintClient } from "@zoralabs/protocol-sdk";
import { useAccount, useNetwork, usePublicClient } from "wagmi";
import { SimulateContractParameters } from "viem";
import useToast from "./useToast";
import { banOutline } from "ionicons/icons";

const useMintClient = () => {
  try {
    const publicClient = usePublicClient();
    const { chain } = useNetwork();
    //const { switchNetwork } = useSwitchNetwork();
    //const result = switchNetwork?.(chainId); //TODO: debug this as it does not work
    const mintClient = useMemo(
      () => chain && createMintClient({ chain, publicClient }),
      [chain, publicClient]
    );

    return mintClient;
  } catch (err) {
    return null;
  }
};

export function useGetZoraSDKParams(
  tokenContract: string,
  chainId: number,
  quantityToMint: number,
  tokenId?: string
) {
  const mintClient = useMintClient();

  // params for the prepare contract write hook
  const [params, setParams] = useState<SimulateContractParameters>();
  const [paramError, setParamError] = useState("");
  const { presentToast } = useToast();
  const { address } = useAccount();

  useEffect(() => {
    console.log(quantityToMint, "quantity?");
    if (!mintClient || !address)
      presentToast(
        "ParamError: Could not find token to mint, please switch network to chainId:" +
          chainId,
        "danger",
        banOutline
      );

    const makeParams = async () => {
      // make the params for the prepare contract write hook
      if (tokenContract && chainId) {
        if (mintClient && address) {
          try {
            const _params = await mintClient.makePrepareMintTokenParams({
              minterAccount: address,
              tokenAddress: tokenContract as `0x${string}`,
              tokenId: tokenId ?? undefined,
              mintArguments: {
                mintToAddress: address,
                quantityToMint,
              },
            });
            setParams(_params);
            setParamError("");
          } catch (err) {
            presentToast(
              "ParamError: Could not find token to mint, please switch network to chainId:" +
                chainId,
              "danger",
              banOutline
            );
          }
        }
      }
    };

    makeParams();
  }, [mintClient, address, quantityToMint, tokenContract, chainId]);

  return { params, quantityToMint };
}

import { createMintClient } from "@zoralabs/protocol-sdk";
import { useEffect, useMemo, useState } from "react";
import { BaseError, SimulateContractParameters, stringify } from "viem";
import {
  Address,
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  usePublicClient,
  useWaitForTransaction,
  useSwitchNetwork,
} from "wagmi";

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

export const MintZoraLogic = (props: {
  tokenId?: string;
  tokenContract: Address;
  chainId: number;
}) => {
  const { tokenId, tokenContract, chainId } = props;
  // call custom hook to get the mintClient
  const mintClient = useMintClient();

  // value will be set by the form
  const [quantityToMint, setQuantityToMint] = useState<number>(1);

  // params for the prepare contract write hook
  const [params, setParams] = useState<SimulateContractParameters>();
  const [paramError, setParamError] = useState("");

  const { address } = useAccount();

  useEffect(() => {
    if (!mintClient || !address)
      setParamError(
        "Could not find token to mint, please switch network to chainId:" +
          chainId
      );

    const makeParams = async () => {
      // make the params for the prepare contract write hook
      if (mintClient && address) {
        try {
          const _params = await mintClient.makePrepareMintTokenParams({
            minterAccount: address,
            tokenAddress: tokenContract,
            tokenId: tokenId ?? undefined,
            mintArguments: {
              mintToAddress: address,
              quantityToMint,
            },
          });
          setParams(_params);
          setParamError("");
        } catch (err) {
          setParamError(
            "Could not find token to mint, please switch network to chainId:" +
              chainId
          );
        }
      }
    };

    makeParams();
  }, [mintClient, address, quantityToMint]);

  console.log(params, "wat is params?");
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite(params);

  const {
    write,
    data,
    error: writeError,
    isLoading,
    isError: isWriteError,
  } = useContractWrite(config);
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  console.log(write, "wats write?", data);

  return (
    <>
      <h3>Mint a token</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        {/* input for quantity to mint: */}
        <input
          placeholder="quantity to mint"
          onChange={(e) => setQuantityToMint(Number(e.target.value))}
        />
        <button disabled={!write} type="submit">
          Mint
        </button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {paramError && <div>{paramError}</div>}
      {isPrepareError && <div>{(prepareError as BaseError)?.shortMessage}</div>}

      {isWriteError && <div>{(writeError as BaseError)?.shortMessage}</div>}
    </>
  );
};

export default MintZoraLogic;

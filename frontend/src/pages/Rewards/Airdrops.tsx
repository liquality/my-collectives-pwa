import { IonContent, IonPage } from "@ionic/react";

import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { RouteComponentProps } from "react-router";
import PageSearchBar from "@/components/PageSearchBar";
import RewardsTopBar from "@/components/TopBars/RewardsTopBar";
import Header from "@/components/Header";

const Airdrops: React.FC<RouteComponentProps> = (routerProps) => {
  const { challenges, loading } = useGetChallenges();
  //TODO: change parent tag to IonPage
  return (
    <IonPage>
      <Header title="Rewards" />

      <Mint
        tokenId={"1"}
        tokenContract={"0x5aa959de99e0e49b8a85e0a630a74a7b757772b7"}
      />
      <IonContent className="ion-padding" color="light">
        <RewardsTopBar {...routerProps}>
          <PageSearchBar searchEnabled={false} reloadEnabled={false} />
        </RewardsTopBar>
        <div className="flexDirectionCol mb-1">
          <h4>AIRDROPPPS</h4>
          <ul className="bullet-points">
            <li>Lorem ipsum dolor gauorn ketrada.</li>
            <li>adipiscing elit haieorty greqa.</li>
            <li>Donec tincidunt odio.</li>
          </ul>
        </div>
        <div className="pink-line mb-1"></div>
      </IonContent>
    </IonPage>
  );
};

export default Airdrops;

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
} from "wagmi";

// custom hook that gets the mintClient for the current chain
const useMintClient = () => {
  const publicClient = usePublicClient();

  const { chain } = useNetwork();

  const mintClient = useMemo(
    () => chain && createMintClient({ chain, publicClient }),
    [chain, publicClient]
  );

  return mintClient;
};

export const Mint = (props: { tokenId: string; tokenContract: Address }) => {
  const { tokenId, tokenContract } = props;
  // call custom hook to get the mintClient
  const mintClient = useMintClient();

  // value will be set by the form
  const [quantityToMint, setQuantityToMint] = useState<number>(1);

  // params for the prepare contract write hook
  const [params, setParams] = useState<SimulateContractParameters>();

  const { address } = useAccount();

  useEffect(() => {
    if (!mintClient || !address) return;

    const makeParams = async () => {
      // make the params for the prepare contract write hook
      const _params = await mintClient.makePrepareMintTokenParams({
        tokenId,
        tokenContract,
        minterAccount: address,
        mintArguments: {
          mintToAddress: address,
          quantityToMint,
        },
      });
      setParams(_params);
    };

    makeParams();
  }, [mintClient, address, quantityToMint]);

  const { config } = usePrepareContractWrite(params);

  const { write, data, error, isLoading, isError } = useContractWrite(config);
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
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  );
};

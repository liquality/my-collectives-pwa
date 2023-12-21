import { Challenge } from "@/types/challenges";
import { MintResult } from "@/types/mint";
import {
  convertDateToReadable,
  convertIpfsImageUrl,
  cutOffTooLongString,
  displayPrice,
  handleDisplayAddress,
  shortenAddress,
} from "@/utils";
import {
  useIonRouter,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSkeletonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonButton,
  IonInput,
  IonItem,
  IonList,
} from "@ionic/react";
import { add, remove } from "ionicons/icons";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MintZoraLogic from "../MintZoraLogic";
import { SimulateContractParameters } from "viem";
import { BigNumberish, ethers } from "ethers";
import { useGetZoraSDKParams } from "@/hooks/useGetZoraSDKParams";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import ContractService from "@/services/ContractService";
import useGetGroupsByChallenge from "@/hooks/Groups/useGetGroupsByChallenge";
import { Group } from "@/types/general-types";

export interface MintItemContentProps {
  challenge: Challenge;
  setResult: Dispatch<SetStateAction<MintResult | null>>;
}

const staticMinterGroup = {
  id: "5c58ca0f-65cf-4849-a413-729efab5842c",
  name: "Some Goerli Minter WOW",
  description: "hey",
  publicAddress: "0x96492A84461aaB0B27610a0C5Bf314637617fe19",
  walletAddress: "0x6566E005634c0B03F560DdEf4cc0D297E35C4d28",
  nonceKey: BigInt(4496831648435611),
  salt: "5542769413479739",
  createdAt: "2023-12-21T15:42:35.094Z",
  createdBy: "fd5847fb-60ca-4f30-9297-32a6cd35ed8e",
  mintCount: 0,
  memberCount: "1",
  poolsCount: "1",
  messagesCount: "0",
  activePoolsCount: "1",
};

const MintItemContent: React.FC<MintItemContentProps> = ({
  challenge,
  setResult,
}: MintItemContentProps) => {
  const {
    totalMints,
    imageUrl,
    name,
    floorPrice,
    groupCount,
    expiration,
    mintingContractAddress,
    honeyPotAddress,
    tokenId,
    chainId,
    creatorOfMint,
  } = challenge;
  const challengeId = (challenge as any).challengeId;
  const ipfsImageUrl = convertIpfsImageUrl(imageUrl);
  const [loadingImage, setLoadingImage] = useState(true);
  const [showGroupList, setShowGroupList] = useState(false);
  const [quantityToMint, setQuantityToMint] = useState(1);
  const router = useIonRouter();
  const { params } = useGetZoraSDKParams(
    mintingContractAddress,
    chainId,
    quantityToMint,
    tokenId ?? undefined
  );
  const { groups, loading: loadingGroups } =
    useGetGroupsByChallenge(challengeId);
  useEffect(() => {}, [quantityToMint, params?.value]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const handleDetailsClick = () => {};
  const handleChangeCollectiveClick = () => {
    setShowGroupList(!showGroupList);
  };

  const handleMintClick = async () => {
    if (params) {
      console.log("Handle mint click!");
      const { publicAddress, walletAddress, nonceKey } = staticMinterGroup;
      console.log(
        publicAddress,
        walletAddress,
        nonceKey,
        params.value ?? BigInt(0),
        mintingContractAddress,
        honeyPotAddress,
        "ALL OF MY PARAMS"
      );
      const mintResult = await ContractService.poolMint(
        publicAddress,
        walletAddress,
        nonceKey,
        params.value ?? BigInt(0),
        mintingContractAddress,
        honeyPotAddress
      );
      console.log(mintResult);

      //setResult({success: true}) // only set result once minting is done
    }
  };
  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
    setShowGroupList(false);
  };

  const handlePlusClick = () => {
    setQuantityToMint(quantityToMint + 1);
  };

  const handleMinusClick = () => {
    if (quantityToMint > 2) {
      setQuantityToMint(quantityToMint - 1);
    } else {
      setQuantityToMint(1);
    }
  };

  useEffect(() => {
    if (!selectedGroup && groups && groups?.length > 0) {
      setSelectedGroup(groups[0]);
    }
  }, [groups]);

  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center">
        <IonCol size="8" style={{ display: "flex", justifyContent: "center" }}>
          <IonCard className="challenge-mint-card">
            <img
              className="challenge-mint-img"
              alt="NFT Image"
              style={{ display: loadingImage ? "none" : "block" }}
              src={ipfsImageUrl}
              onLoad={() => setLoadingImage(false)}
              onError={() => setLoadingImage(false)}
            />
            {loadingImage ? (
              <IonSkeletonText
                className="challenge-mint-img-skeleton"
                animated={true}
              ></IonSkeletonText>
            ) : null}
            <div className="challenge-time-chip challenge-time-chip-ontop">
              {convertDateToReadable(expiration)}
            </div>
            <IonCardHeader>
              <IonCardTitle>
                {loadingImage ? (
                  <IonSkeletonText animated={true}></IonSkeletonText>
                ) : (
                  handleDisplayAddress(creatorOfMint ?? "")
                )}
              </IonCardTitle>
              <IonCardSubtitle>
                {<div className="name">{cutOffTooLongString(name, 30)}</div>}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="">
                <IonRow className="ion-justify-content-left ion-align-items-center">
                  <IonCol size="auto">
                    <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
                    <IonLabel>{totalMints}</IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center ion-align-items-center">
        <IonCol size="8" className="challenge-mint-amount-container">
          <IonButton
            className="challenge-mint-amount-btn"
            fill="outline"
            shape="round"
            size="small"
            onClick={handlePlusClick}
          >
            <IonIcon slot="icon-only" icon={add}></IonIcon>
          </IonButton>

          <IonInput
            className="challenge-mint-amount"
            type="number"
            value={quantityToMint}
          ></IonInput>
          <IonButton
            className="challenge-mint-amount-btn"
            fill="outline"
            shape="round"
            size="small"
            onClick={handleMinusClick}
            disabled={quantityToMint <= 1}
          >
            <IonIcon slot="icon-only" icon={remove}></IonIcon>
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="6">NFT & Fee: {displayPrice(floorPrice, params)}</IonCol>
        <IonCol size="2">
          <IonButton fill="clear" size="small" onClick={handleDetailsClick}>
            Details
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="6">{selectedGroup?.name}</IonCol>

        <IonCol size="2">
          <IonButton
            fill="clear"
            size="small"
            onClick={handleChangeCollectiveClick}
          >
            Change
          </IonButton>
        </IonCol>
      </IonRow>
      {showGroupList ? (
        <IonRow className="ion-justify-content-center">
          <IonCol size="9">
            <IonList lines="none">
              {groups?.map((group, index) => (
                <IonItem
                  key={index}
                  button
                  disabled={group.id === selectedGroup?.id}
                  onClick={() => handleSelectGroup(group)}
                >
                  <IonLabel>{group.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
        </IonRow>
      ) : null}
      <IonRow className="mint-content-bottom-ribbon ion-justify-content-center ion-align-items-center">
        <IonCol size="12">
          <IonButton fill="clear" size="small" className="ion-no-padding">
            Mint in a Group
          </IonButton>
          <IonLabel> for a chance to get rewared</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          <IonButton
            onClick={() => handleMintClick()}
            color="primary"
            shape="round"
          >
            Mint {displayPrice(floorPrice, params)} ETH
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default MintItemContent;

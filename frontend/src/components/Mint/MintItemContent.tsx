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
import { add, banOutline, remove } from "ionicons/icons";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MintZoraLogic from "../MintZoraLogic";
import { SimulateContractParameters } from "viem";
import { BigNumberish, ethers } from "ethers";
import { useGetZoraSDKParams } from "@/hooks/useGetZoraSDKParams";
import useGetMyGroups from "@/hooks/Groups/useGetMyGroups";
import ContractService from "@/services/ContractService";
import useGetGroupsByChallenge from "@/hooks/Groups/useGetGroupsByChallenge";
import { Group } from "@/types/general-types";
import useToast from "@/hooks/useToast";
import { PageLoadingIndicator } from "../PageLoadingIndicator";

export interface MintItemContentProps {
  challenge: Challenge;
  setResult: Dispatch<SetStateAction<MintResult | null>>;
}

const MintItemContent: React.FC<MintItemContentProps> = ({
  challenge,
  setResult,
}: MintItemContentProps) => {
  const {
    id,
    totalMints,
    imageUrl,
    name,
    floorPrice,
    groupCount,
    network,
    platform,
    expiration,
    mintingContractAddress,
    honeyPotAddress,
    tokenId,
    chainId,
    creatorOfMint,
  } = challenge;

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
  const { presentToast } = useToast();
  const { groups, loading: loadingGroups } = useGetGroupsByChallenge(id);
  useEffect(() => {}, [quantityToMint, params?.value]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const handleDetailsClick = () => {};
  const handleChangeCollectiveClick = () => {
    setShowGroupList(!showGroupList);
  };
  const [pendingMint, setPendingMint] = useState(false);

  let zoraFee = BigInt(ethers.utils.parseEther("0.000777").toString());
  let amountInWeiToPay =
    platform === "Zora" && network === "goerli"
      ? params?.value
        ? zoraFee + params.value
        : zoraFee
      : BigInt(ethers.utils.parseEther("0.0005").toString());

  const handleMintClick = async () => {
    if (selectedGroup) {
      try {
        setPendingMint(true);
        const { publicAddress, walletAddress, nonceKey } = selectedGroup;
        console.log(
          publicAddress,
          walletAddress,
          nonceKey,
          amountInWeiToPay, //  params.value ?? BigInt(0)
          mintingContractAddress,
          honeyPotAddress,
          "ALL OF MY PARAMS to ContractService.PoolMint()"
        );
        const mintResult = await ContractService.poolMint(
          publicAddress,
          walletAddress,
          BigInt(nonceKey),
          amountInWeiToPay, //params.value ?? BigInt(0),
          mintingContractAddress,
          honeyPotAddress,
          Number(tokenId)
        );
        console.log(mintResult);
        if (mintResult) {
          setPendingMint(false);
          setResult({ success: true });
        } else {
          throw Error;
        }
      } catch (error) {
        setPendingMint(false);
        presentToast("Minting failed", "danger", banOutline);
      }
    } else {
      presentToast("You need to select a collective!", "danger", banOutline);
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
      {pendingMint ? (
        <PageLoadingIndicator />
      ) : (
        <IonRow className="ion-justify-content-center">
          <IonCol
            size="8"
            style={{ display: "flex", justifyContent: "center" }}
          >
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
      )}

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

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { convertIpfsImageUrl } from "@/utils";
import { useIonRouter } from "@ionic/react";

export interface SwipeCardProps {
  tokenId: string;
  mintingContractAddress: string;
  imageUrl: string;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  tokenId,
  mintingContractAddress,
  imageUrl,
}: SwipeCardProps) => {
  const ipfsImageUrl = convertIpfsImageUrl(imageUrl);
  const [loading, setLoading] = useState(true);
  const router = useIonRouter();
  const handleClick = () => {
    console.log(tokenId, mintingContractAddress, ipfsImageUrl, "all of these?");
    if (!loading) {
      router.push(
        `/challenge/${tokenId}?&contractAddress=${mintingContractAddress}&imageUrl=${ipfsImageUrl}`
      );
    }
  };

  return (
    <div className="card-img-swiper">
      {" "}
      <img
        className="swiper-item-img"
        alt="NFT Image"
        style={{ display: loading ? "none" : "block" }}
        src={ipfsImageUrl}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
};

export default SwipeCard;

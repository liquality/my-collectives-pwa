import useGetMintActivity from "@/hooks/Challenges/useGetMintActivity";
import { Challenge } from "@/types/challenges";
import { shortenAddress } from "@/utils";

export interface InfoSheetModalMintActivityProps {
  challenge: Challenge;
}

const InfoSheetModalMintActivity: React.FC<InfoSheetModalMintActivityProps> = (
  props: InfoSheetModalMintActivityProps
) => {
  const { challenge } = props;
  const { network, tokenId, mintingContractAddress } = challenge;
  const { mintActivity, loading } = useGetMintActivity(
    mintingContractAddress,
    network,
    tokenId ?? ""
  );
  return (
    <div>
      Leaderboard mint activity:{" "}
      <div className="flexDirectionCol">
        {mintActivity?.map((mint: any) => (
          <div className="flexDirectonRow">
            {shortenAddress(mint.address)} Total Mints:: {mint.totalCount} Total
            volume: {mint.amount?.totalNative ?? "?"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSheetModalMintActivity;

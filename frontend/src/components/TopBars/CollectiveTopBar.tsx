import PageTopBar from "@/components/PageTopBar";
import useGetChallengesByGroupId from "@/hooks/Collective/useGetChallengesByGroupId";
import { pathConstants } from "@/utils/routeNames";
import { useParams } from "react-router";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const CollectiveTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { pools, loading } = useGetChallengesByGroupId(groupId);

  return (
    <PageTopBar
      tabs={[
        {
          label: `Mint | ${loading ? " " : pools?.length}`,
          href: pathConstants.collective.mints.replace(
            ":groupId",
            groupId
          ),
        },
        {
          label: "Chat",
          href: pathConstants.collective.chat.replace(
            ":groupId",
            groupId
          ),
        },
        {
          label: "Info",
          href: pathConstants.collective.info.replace(
            ":groupId",
            groupId
          ),
        },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default CollectiveTopBar;

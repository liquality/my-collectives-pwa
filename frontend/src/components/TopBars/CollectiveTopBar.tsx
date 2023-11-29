import PageTopBar from "@/components/PageTopBar";
import useGetPoolsByGroupId from "@/hooks/Collective/useGetPoolsByGroupId";
import { pathConstants } from "@/utils/routeNames";
import { useParams } from "react-router";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const CollectiveTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { pools, loading } = useGetPoolsByGroupId(groupId);
  console.log(groupId, "groupId in CollectiveBarTop");

  return (
    <PageTopBar
      tabs={[
        {
          label: `Mint | ${pools?.length}`,
          href: pathConstants.collectiveDetail.mints.replace(
            ":groupId",
            groupId
          ),
        },
        {
          label: "Chat",
          href: pathConstants.collectiveDetail.chat.replace(
            ":groupId",
            groupId
          ),
        },
        {
          label: "Info",
          href: pathConstants.collectiveDetail.info.replace(
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

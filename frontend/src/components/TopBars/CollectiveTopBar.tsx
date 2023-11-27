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
          href: pathConstants.collectiveDetail.collectiveDetail + groupId,
        },
        { label: "Chat", href: pathConstants.collectiveDetail.chat + groupId },
        { label: "Info", href: pathConstants.collectiveDetail + groupId },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default CollectiveTopBar;

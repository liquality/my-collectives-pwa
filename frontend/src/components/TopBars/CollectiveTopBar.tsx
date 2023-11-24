import PageTopBar from "@/components/PageTopBar";
import useGetPoolsByGroupId from "@/hooks/Collective/useGetPoolsByGroupId";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import { getLastIndexOfPath, pathConstants } from "@/utils/routeNames";
import { useLocation } from "react-router";
import { numberToBytes } from "viem";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const CollectiveTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  const location = useLocation();
  const groupId = getLastIndexOfPath(location.pathname);
  const { pools, loading } = useGetPoolsByGroupId(groupId);

  return (
    <PageTopBar
      tabs={[
        {
          label: `Mint | ${pools?.length}`,
          href: pathConstants.collectiveDetail.collectiveDetail(groupId),
        },
        { label: "Chat", href: pathConstants.collectiveDetail.chat(groupId) },
        { label: "Info", href: pathConstants.collectiveDetail.info(groupId) },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default CollectiveTopBar;

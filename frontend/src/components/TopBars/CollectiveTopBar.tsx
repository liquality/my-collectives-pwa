import PageTopBar from "@/components/PageTopBar";
import { getLastIndexOfPath, pathConstants } from "@/utils/routeNames";
import { useLocation } from "react-router";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const CollectiveTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  const location = useLocation();
  const groupId = getLastIndexOfPath(location.pathname);

  return (
    <PageTopBar
      tabs={[
        {
          label: "Mint",
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

import PageTopBar from "@/components/PageTopBar";
import { pathConstants } from "@/utils/routeNames";
import { RouteComponentProps, useLocation, useParams } from "react-router";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const CollectiveTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  const location = useLocation();
  const groupId = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  console.log(groupId, "groupId? in top bar");

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

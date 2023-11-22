import PageTopBar from "@/components/PageTopBar";
import { routes } from "@/utils/routeNames";
import { RouteComponentProps } from "react-router";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const CollectiveTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  return (
    <PageTopBar
      tabs={[
        { label: "Mint", href: routes.collectiveDetail.collectiveDetail },
        { label: "Chat", href: routes.collectiveDetail.chat },
        { label: "Info", href: routes.collectiveDetail.info },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default CollectiveTopBar;

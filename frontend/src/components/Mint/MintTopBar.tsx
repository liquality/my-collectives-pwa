import PageTopBar from "@/components/PageTopBar";
import { routes } from "@/utils/routeNames";
import { RouteComponentProps } from "react-router";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const MintTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  return (
    <PageTopBar
      tabs={[
        { label: "Collectives", href: routes.mintPage.myCollectives },
        { label: "Invites", href: routes.mintPage.collectiveInvites },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default MintTopBar;

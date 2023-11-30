import PageTopBar from "@/components/PageTopBar";
import { pathConstants } from "@/utils/routeNames";
import { RouteComponentProps } from "react-router";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const MintTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  return (
    <PageTopBar
      tabs={[
        { label: "My Collectives", href: pathConstants.mintPage.myCollectives },
        { label: "Invites", href: pathConstants.mintPage.collectiveInvites },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default MintTopBar;

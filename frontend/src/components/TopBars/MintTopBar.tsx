import PageTopBar from "@/components/PageTopBar";
import { pathConstants } from "@/utils/routeNames";
import { RouteComponentProps } from "react-router";
export interface MintTopBarProps {
  children?: React.ReactNode;
}
const MintTopBar: React.FC<MintTopBarProps> = ({ children }) => {
  return (
    <PageTopBar
      tabs={[
        { label: "My Collectives", href: pathConstants.mintPage.myCollectives },
        { label: "My Mints", href: pathConstants.mintPage.mymints },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default MintTopBar;

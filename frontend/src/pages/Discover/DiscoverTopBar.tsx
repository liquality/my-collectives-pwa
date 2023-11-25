import PageTopBar from "@/components/PageTopBar";
import { pathConstants } from "@/utils/routeNames";
import { RouteComponentProps } from "react-router";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const DiscoverTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  return (
    <PageTopBar
      tabs={[
        { label: "New", href: pathConstants.discover.new },
        { label: "About", href: pathConstants.discover.about },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default DiscoverTopBar;

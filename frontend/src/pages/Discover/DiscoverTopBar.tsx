import PageTopBar from "@/components/PageTopBar";
import { routes } from "@/utils/routeNames";
import { RouteComponentProps } from "react-router";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const DiscoverTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  return (
    <PageTopBar
      tabs={[
        { label: "New", href: routes.discover.new },
        { label: "About", href: routes.discover.about },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default DiscoverTopBar;

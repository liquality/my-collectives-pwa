import PageTopBar from "@/components/PageTopBar";
import { RouteComponentProps } from "react-router";
export interface DiscoverTopBarProps {
  children?: React.ReactNode;
}
const DiscoverTopBar: React.FC<DiscoverTopBarProps> = ({ children }) => {
  return (
    <PageTopBar
      tabs={[
        { label: "New", href: `/discover/new` },
        { label: "About", href: `/discover/about` },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default DiscoverTopBar;

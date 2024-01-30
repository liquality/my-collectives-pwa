import PageTopBar from "@/components/PageTopBar";
import { pathConstants } from "@/utils/routeNames";
import { RouteComponentProps } from "react-router";
export interface RewardsTopBarProps {
  children?: React.ReactNode;
}
const RewardsTopBar: React.FC<RewardsTopBarProps> = ({ children }) => {
  return (
    <PageTopBar
      tabs={[
        { label: "Summary", href: pathConstants.rewards.summary },
        { label: "Airdrops", href: pathConstants.rewards.airdrops },
      ]}
    >
      {children}
    </PageTopBar>
  );
};

export default RewardsTopBar;

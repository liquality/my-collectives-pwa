import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { IonToolbar, IonButtons, IonButton, useIonRouter } from "@ionic/react";

export interface PageTopBarTab {
  label: string;
  href: string;
}
export interface PageTopBarProps {
  tabs: PageTopBarTab[];
  children?: React.ReactNode;
}
const PageTopBar: React.FC<PageTopBarProps> = ({
  tabs,
  children,
}: PageTopBarProps) => {
  const isActiveRoute = useIsActiveRoute();
  const router = useIonRouter();
  const handleTabClick = (href: string) => {
    console.log('loading href', href)
    router.push(href, "root", "replace");
  };
  return (
    <IonToolbar className="app-page-top-bar">
      <IonButtons slot="start">
        {tabs.map((tab) => (
          <IonButton
            className="app-page-top-tab-button"
            key={tab.href}
            onClick={() => handleTabClick(tab.href)}
            color={isActiveRoute(tab.href) ? "primary" : ""}
          >
            {tab.label}
          </IonButton>
        ))}
      </IonButtons>
      {children}
    </IonToolbar>
  );
};
export default PageTopBar;

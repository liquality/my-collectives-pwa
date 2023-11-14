import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import {
  IonSearchbarCustomEvent,
  SearchbarChangeEventDetail,
} from "@ionic/core";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
} from "@ionic/react";
import { useState } from "react";

export interface PageTopBarTab {
  label: string;
  href: string;
}
export interface PageTopBarProps {
  tabs: PageTopBarTab[];
  searchPlaceholder?: string;
  onClickSearch?: () => void;
  onClearSearch?: () => void;
  onSearchChange?: (value?: string | null) => void;
}
const PageTopBar: React.FC<PageTopBarProps> = ({
  tabs,
  onClickSearch,
  onClearSearch,
  onSearchChange,
  searchPlaceholder = "Search",
}: PageTopBarProps) => {
  const isActiveRoute = useIsActiveRoute();
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const handleSearchIconClick = () => {
    setSearchBarOpen(true);
    if (onClickSearch) {
      onClickSearch();
    }
  };
  const handleClearSearch = () => {
    setSearchBarOpen(false);
    if (onClearSearch) {
      onClearSearch();
    }
  };
  const handleSearchChange = (
    e: IonSearchbarCustomEvent<SearchbarChangeEventDetail>
  ) => {
    if (onSearchChange) {
      onSearchChange(e.detail.value);
    }
  };
  return (
    <IonToolbar className="app-page-top-bar">
      <IonButtons slot="start">
        {tabs.map((tab) => (
          <IonButton
            className="app-page-top-tab-button"
            key={tab.href}
            routerLink={tab.href}
            routerDirection="root"
            color={isActiveRoute(tab.href) ? "primary" : ""}
          >
            {tab.label}
          </IonButton>
        ))}
      </IonButtons>
      <div
        className={
          searchBarOpen
            ? "app-page-top-search-bar active"
            : "app-page-top-search-bar"
        }
      >
        <IonSearchbar
          showClearButton="always"
          onIonChange={handleSearchChange}
          animated
          value={searchBarOpen ? "" : undefined}
          placeholder={searchPlaceholder}
          onIonClear={handleClearSearch}
          searchIcon="./assets/icons/search-bar-icon.svg"
        ></IonSearchbar>
      </div>
      <IonButtons slot="end">
        <IonButton onClick={handleSearchIconClick}>
          <IonIcon src="./assets/icons/search.svg" />
        </IonButton>
        <IonButton>
          <IonIcon src="./assets/icons/reload.svg" />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};
export default PageTopBar;

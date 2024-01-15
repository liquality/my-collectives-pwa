import {
  IonSearchbarCustomEvent,
  SearchbarChangeEventDetail,
} from "@ionic/core";
import { IonButton, IonButtons, IonIcon, IonSearchbar } from "@ionic/react";
import { useState } from "react";

export interface PageSearchBarProps {
  searchPlaceholder?: string;
  onClickSearch?: () => void;
  onClearSearch?: () => void;
  onClickReload?: () => void;
  onSearchChange?: (value?: string | null) => void;
  searchEnabled?: boolean;
  reloadEnabled?: boolean;
}
const PageSearchBar: React.FC<PageSearchBarProps> = ({
  onClickSearch,
  onClearSearch,
  onSearchChange,
  onClickReload,
  searchPlaceholder = "Search",
  searchEnabled = true,
  reloadEnabled = true,
}: PageSearchBarProps) => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const handleSearchIconClick = () => {
    setSearchBarOpen(true);
    if (onClickSearch) {
      onClickSearch();
    }
  };
  const handleReloadIconClick = () => {
    window.location.reload();

    if (onClickReload) {
      onClickReload();
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
    <>
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
          value={searchBarOpen ? " " : undefined}
          placeholder={searchPlaceholder}
          onIonClear={handleClearSearch}
          searchIcon="./assets/icons/search-bar-icon.svg"
        ></IonSearchbar>
      </div>
      <IonButtons slot="end" className="app-page-top-search-buttons">
        {searchEnabled ? (
          <IonButton onClick={handleSearchIconClick}>
            <IonIcon src="./assets/icons/search-bar-icon.svg" />
          </IonButton>
        ) : null}
        {reloadEnabled ? (
          <IonButton onClick={handleReloadIconClick}>
            <IonIcon src="./assets/icons/reload.svg" />
          </IonButton>
        ) : null}
      </IonButtons>
    </>
  );
};
export default PageSearchBar;

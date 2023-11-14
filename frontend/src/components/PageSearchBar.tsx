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
  onSearchChange?: (value?: string | null) => void;
}
const PageSearchBar: React.FC<PageSearchBarProps> = ({
  onClickSearch,
  onClearSearch,
  onSearchChange,
  searchPlaceholder = "Search",
}: PageSearchBarProps) => {
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
      <IonButtons slot="end">
        <IonButton onClick={handleSearchIconClick}>
          <IonIcon src="./assets/icons/search.svg" />
        </IonButton>
        <IonButton>
          <IonIcon src="./assets/icons/reload.svg" />
        </IonButton>
      </IonButtons>
    </>
  );
};
export default PageSearchBar;

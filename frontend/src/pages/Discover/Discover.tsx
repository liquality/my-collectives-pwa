import Header from "@/components/Header";
import {
  IonContent,
  IonPage,
  IonRouterOutlet,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import New from "./New";
import About from "./About";
import PageTopBar from "@/components/PageTopBar";

const Discover: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <Header title="Discover" />
      <IonContent className="ion-padding" color="light">
        {/* <IonTabs className="app-page-tabs">
          <IonRouterOutlet>
            <Route path={`/discover/new`} render={() => <New />} exact />
            <Route path={`/discover/info`} render={() => <Info />} exact />
          </IonRouterOutlet>
          <IonTabBar slot="top" className="app-page-top-tab-bar">
            <IonTabButton tab="disconver.new" href={`${match.url}/new`}>
              <IonLabel>New</IonLabel>
            </IonTabButton>
            <IonTabButton tab="disconver.info" href={`${match.url}/info`}>
              <IonLabel>Info</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs> */}
        <PageTopBar
          tabs={[
            { label: "New", href: `${match.url}/new` },
            { label: "About", href: `${match.url}/about` },
          ]}
        />
        <IonRouterOutlet className="app-page-router-outlet">
          <Route path={`/discover/new`} render={() => <New />} exact />
          <Route path={`/discover/about`} render={() => <About />} exact />
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default Discover;

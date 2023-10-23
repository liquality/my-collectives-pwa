import CreateGroup from "@/components/Groups/CreateGroup";
import GroupRows from "@/components/Groups/GroupRows";
import Header from "@/components/Header";
import { IonContent, IonPage } from "@ionic/react";

const Groups: React.FC = () => {
  return (
    <IonPage className="page-padding">
      <Header />
      <IonContent fullscreen>
        <CreateGroup />
        <GroupRows />
      </IonContent>
    </IonPage>
  );
};

export default Groups;

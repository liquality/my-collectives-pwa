import Chat from "@/components/Chat";
import useGetGroupById from "@/components/Groups/useGetGroupById";
import Header from "@/components/Header";
import { IonContent, IonPage, IonTitle } from "@ionic/react";
import { useParams } from "react-router-dom";

const Messages = () => {
  let { groupId } = useParams<{ groupId: string }>();
  console.log(groupId, "waaaaats gruppID?");
  const { group, loading } = useGetGroupById(groupId);

  const handleGoToGroupMessages = async () => {};
  return (
    <IonPage className="page-padding">
      <Header />
      <IonContent fullscreen>
        {!loading && group ? (
          <Chat group={group} />
        ) : (
          <IonTitle>Loading..</IonTitle>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Messages;

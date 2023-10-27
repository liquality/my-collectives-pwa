import Chat from "@/components/Chat";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import Header from "@/components/Header";
import { IonContent, IonPage, IonTitle } from "@ionic/react";
import { useParams } from "react-router-dom";

const Messages = () => {
  let { groupId } = useParams<{ groupId: string }>();
  console.log(groupId, "waaaaats gruppID?");
  const { group, loading } = useGetGroupById(groupId);

  const handleGoToGroupMessages = async () => {};
  return (
    <IonPage>
      <Header title="Messages"/>
      <IonContent className="ion-padding"  color="light">
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

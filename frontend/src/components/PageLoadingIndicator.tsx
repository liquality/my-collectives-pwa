import { IonRow, IonCol, IonProgressBar } from "@ionic/react";

export const PageLoadingIndicator = () => {
  return (
    <IonRow
      className="ion-justify-content-center ion-align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <IonCol>
        <IonProgressBar type="indeterminate"></IonProgressBar>
      </IonCol>
    </IonRow>
  );
};

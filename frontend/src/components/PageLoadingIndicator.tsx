import { IonRow, IonCol, IonProgressBar, IonGrid } from "@ionic/react";

export const PageLoadingIndicator = () => {
  return (
    <IonGrid>
      {" "}
      <IonRow
        className="ion-justify-content-center ion-align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <IonCol>
          <IonProgressBar type="indeterminate"></IonProgressBar>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

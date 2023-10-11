import React from "react";
import Cookies from "universal-cookie";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  useIonRouter,
} from "@ionic/react";
import { checkAuth } from "@/utils";
const cookies = new Cookies();
const Auth = () => {
  const router = useIonRouter();

  const signInWithGoogle = async () => {
    try {
      //const result = await signInWithPopup(auth, provider);
      //cookies.set("auth-token", result.user.refreshToken);
      router.push("/room");
    } catch (error) {
      console.log(error, "ERROR in Auth");
    }
  };

  return (
    <>
      {checkAuth() ? null : (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Sign in with Google</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonButton onClick={signInWithGoogle}>Sign in</IonButton>
          </IonCardContent>
        </IonCard>
      )}
    </>
  );
};

export default Auth;

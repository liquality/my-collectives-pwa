import { useIonToast, ToastOptions } from "@ionic/react";
import { copy } from "ionicons/icons";

export default function useToast() {
  const [present] = useIonToast();
  //TODO: add custom style + onclick actiion
  const presentToast = (msg: string) => {
    const options: ToastOptions = {
      message: msg,
      duration: 3500,
      position: "top",
      icon: copy,
      //color: "#BEFFEC",
    };

    present(options);
  };

  return { presentToast };
}

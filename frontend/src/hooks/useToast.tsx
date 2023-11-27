import { useIonToast, ToastOptions } from "@ionic/react";
import { useEffect } from "react";
import { colorPalette, copy } from "ionicons/icons";

export default function useToast() {
  const [present] = useIonToast();

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

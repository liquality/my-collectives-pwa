import { useIonToast, ToastOptions } from "@ionic/react";

export default function useToast() {
  const [present] = useIonToast();
  //TODO: add custom style + onclick actiion
  const presentToast = (msg: string, type: string, icon: string) => {
    const options: ToastOptions = {
      message: msg,
      duration: 3500,
      position: "top",
      icon: icon,
      color: type,
    };

    present(options);
  };

  return { presentToast };
}

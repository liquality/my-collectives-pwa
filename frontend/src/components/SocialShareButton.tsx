import { IonButton, IonIcon } from "@ionic/react";

const urls = {
  x: (text: string, url: string) =>
    `https://x.com/intent/tweet?text=${text}&url=${url}`,
  discord: (text: string, url: string) => ``,
  telegram: (text: string, url: string) =>
    `https://telegram.me/share/url?text=${text}&url=${url}`,
  sound: (text: string, url: string) => ``,
};

const icons = {
  x: "/assets/icons/social_twitter.svg",
  discord: "/assets/icons/social_discord.svg",
  telegram: "/assets/icons/social_telegram.svg",
  sound: "/assets/icons/social_sound.svg",
};
export interface SocialShareButtonProps {
  socialNetwork: "x" | "discord" | "telegram" | "sound";
  url?: string;
  title?: string;
  text: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  url,
  socialNetwork,
  text,
}) => {
  return (
    <IonButton
      fill="clear"
      href={urls[socialNetwork](text, url || '')}
      target="_blank"
    >
      <IonIcon slot="icon-only" src={icons[socialNetwork]} />
    </IonButton>
  );
};

export default SocialShareButton;

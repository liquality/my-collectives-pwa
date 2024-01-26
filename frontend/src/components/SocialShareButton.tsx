import { IonButton, IonIcon } from "@ionic/react";

const urls = {
  x: (text: string, url: string) => `https://x.com/intent/tweet?text=${text}&url=${url}`,
  discord: (text: string, url: string) => ``,
  telegram: (text: string, url: string) => `https://telegram.me/share/url?text=${text}&url=${url}`,
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
  challengeId: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  challengeId,
  socialNetwork,
}) => {
  const baseUrl = import.meta.env.VITE_CLIENT_PRODUCTION_URL || "";
  const text = `I just minted in MyCollective.tech`;

  return (
    <IonButton
      fill="clear"
      href={urls[socialNetwork](text, `${baseUrl}mint/nft/${challengeId}`)}
      target="_blank"
    >
      <IonIcon slot="icon-only" src={icons[socialNetwork]} />
    </IonButton>
  );
};

export default SocialShareButton;

import { colorPalette } from "@/theme/palette";
import { IonButton } from "@ionic/react";
import React from "react";

interface CustomButtonProps {
  style: "primary" | "disabled" | "cancel";
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ style, text }) => {
  const getButtonStyle = () => {
    switch (style) {
      case "primary":
        return {
          backgroundColor: colorPalette.primaryPurple,
          color: "white",
        };
      case "disabled":
        return {
          backgroundColor: colorPalette.lightGrey,
          color: colorPalette.darkGrey,
        };
      case "cancel":
        return {
          backgroundColor: "white",
          color: colorPalette.primaryPurple,
        };
      default:
        return {}; // Default to an empty object or another fallback style
    }
  };

  const buttonStyle: React.CSSProperties = {
    ...getButtonStyle(),
  };

  console.log(getButtonStyle(), "btn style?", style);

  return (
    <IonButton
      disabled={style === "disabled"}
      className="custom-button"
      style={buttonStyle}
    >
      {text}
    </IonButton>
  );
};

export default CustomButton;

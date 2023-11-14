import React from "react";
import "./CustomButton.css"; // Import or define your styles

interface CustomButtonProps {
  style: "primary" | "disabled" | "cancel";
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ style, text }) => {
  const getButtonStyle = () => {
    switch (style) {
      case "primary":
        return {
          backgroundColor: "purple",
          color: "white",
        };
      case "disabled":
        return {
          backgroundColor: "grey",
          color: "darkgrey",
        };
      case "cancel":
        return {
          backgroundColor: "white",
          color: "purple",
        };
      default:
        return {}; // Default to an empty object or another fallback style
    }
  };

  const buttonStyle: React.CSSProperties = {
    ...getButtonStyle(),
    textAlign: "center",
    borderRadius: "25px",
    padding: "15px",
    width: "50%",
  };

  return (
    <button className="custom-button" style={buttonStyle}>
      {text}
    </button>
  );
};

export default CustomButton;

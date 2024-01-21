import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { IonIcon } from "@ionic/react";
import { useEffect, useState } from "react";

export interface MenuIconProps {
  icon: string;
  route: string;
  slot?: string;
}

const MenuIcon = ({ icon, route, slot = '' }: MenuIconProps) => {
  const isActive = useIsActiveRoute();
  const active = isActive(route);
  return (
    <IonIcon
      color={active ? "primary" : ""}
      src={`/assets/icons/${icon}${active ? "_active" : ""}.svg`}
      slot={slot}
    />
  );
};

export default MenuIcon;

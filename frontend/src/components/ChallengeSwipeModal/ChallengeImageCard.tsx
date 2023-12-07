import {
  useMotionValue,
  useTransform,
  useAnimation,
  motion,
  useMotionValueEvent,
} from "framer";
import ImageLoader from "../Images/ImageLoader";
import { Dispatch, SetStateAction } from "react";
import { isPlatform } from "@ionic/react";

export type ChallengeImageCardProps = {
  url: string;
  onSwipe: (direction: string) => void;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
};

// Card component with destructured props
const ChallengeImageCard = ({
  url,
  isDragging,
  setIsDragging,
  onSwipe,
}: ChallengeImageCardProps) => {
  const x = useMotionValue(0);

  const offsetBoundary = 35;
  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-100, 0, 100];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];

  let drivenX = useTransform(x, inputX, outputX);
  let drivenY = useTransform(x, inputX, outputY);
  let drivenRotation = useTransform(x, inputX, outputRotate);

  return (
    <>
      <motion.div
        className="challenge-info-card-item"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        <ImageLoader src={url} className="challenge-info-img" />
      </motion.div>
      <motion.div
        className={`challenge-info-card-item-element ${
          !isDragging ? "challenge-info-card-item-element-dragging" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={isPlatform("desktop") ? 0.06 : 0.2}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);

          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;

          if (isOffBoundary) {
            const direction = info.offset.x > 0 ? "right" : "left";
            onSwipe(direction);
          }
        }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default ChallengeImageCard;

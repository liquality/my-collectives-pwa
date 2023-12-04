import { IonSkeletonText } from "@ionic/react";
import { useState } from "react";

export interface ImageLoaderProps {
  src: string;
  className?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  className = 'img-responsive',
}: ImageLoaderProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <img
        className={className}
        style={{ display: loading ? "none" : "block" }}
        src={src}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      {loading ? (
        <IonSkeletonText
          className={className}
          animated={true}
        ></IonSkeletonText>
      ) : null}
    </>
  );
};
export default ImageLoader;

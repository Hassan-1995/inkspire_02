// components/WrapperCanvasMug.tsx
import DrinkwareCanvas from "./DrinkwareCanvas";

const WrapperCanvasMug = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <DrinkwareCanvas
      imageUrl={imageUrl}
      height={1.75}
      topRadius={0.9}
      bottomRadius={0.99}
      angleFraction={0.9}
    />
  );
};

export default WrapperCanvasMug;

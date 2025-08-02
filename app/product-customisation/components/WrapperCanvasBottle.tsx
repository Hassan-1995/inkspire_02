import DrinkwareCanvas from "./DrinkwareCanvas";

const WrapperCanvasBottle = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <DrinkwareCanvas
      imageUrl={imageUrl}
      height={1.5}
      topRadius={0.45}
      bottomRadius={0.5}
      angleFraction={0.9}
      rotation={[0.33, -1.7, 0]}
    />
  );
};

export default WrapperCanvasBottle;

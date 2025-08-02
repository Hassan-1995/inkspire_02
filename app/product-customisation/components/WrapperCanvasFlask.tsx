import DrinkwareCanvas from "./DrinkwareCanvas";

const WrapperCanvasFlask = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <DrinkwareCanvas
      imageUrl={imageUrl}
      height={1.5}
      topRadius={0.85}
      bottomRadius={0.89}
      angleFraction={0.9}
      rotation={[0.16, -1.1, 0]}
    />
  );
};

export default WrapperCanvasFlask;

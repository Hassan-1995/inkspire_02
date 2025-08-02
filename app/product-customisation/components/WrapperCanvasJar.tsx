import DrinkwareCanvas from "./DrinkwareCanvas";

const WrapperCanvasJar = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <DrinkwareCanvas
      imageUrl={imageUrl}
      height={1.5}
      topRadius={0.99}
      bottomRadius={1.04}
      angleFraction={1}
      rotation={[0.34, -0.9, 0]}
    />
  );
};

export default WrapperCanvasJar;

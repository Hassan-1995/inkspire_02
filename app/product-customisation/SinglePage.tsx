"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ImagePlacementOne from "./components/ImagePlacementOne";
import ImageUploaderOne from "./components/ImageUploaderOne";
import ImageFinalisation from "./components/ImageFinalisation";

type SinglePageProps = {
  catalog: string;
  catalogItem: string;
};

const SinglePage = ({ catalog, catalogItem }: SinglePageProps) => {
  const progress = useSelector(
    (state: RootState) => state.progressBar.progressBarValue
  );
  return (
    <div className="w-full md:4/5 lg:w-2/3 my-10">
      <h1>{catalog}</h1>
      <h1>{catalogItem}</h1>
      {progress === 1 && <ImageUploaderOne />}
      {progress === 2 && <ImagePlacementOne catalogItem={catalogItem} />}
      {progress === 3 && (
        <ImageFinalisation catalog={catalog} catalogItem={catalogItem} />
      )}
    </div>
  );
};

export default SinglePage;

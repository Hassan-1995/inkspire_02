"use client";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProgressBarValue } from "../store/slices/progressBarSlice";
import { RootState } from "../store/store";
import ImageFinalisation from "./components/ImageFinalisation";
import ImagePlacementTwo from "./components/ImagePlacementTwo";
import ImageUploaderTwo from "./components/ImageUploaderTwo";

type ApparelPageProps = {
  catalog: string;
  catalogItem: string;
};

const ApparelPage = ({ catalog, catalogItem }: ApparelPageProps) => {
  const dispatch = useDispatch();
  // const progress = useSelector(
  //   (state: RootState) => state.progressBar.progressBarValue
  // );
  const { progressBarValue } = useSelector(
    (state: RootState) => state.progressBar
  );
  const { productFrontPath } = useSelector((state: RootState) => state.product);

  const handleInitialProgress = useCallback(() => {
    const existingCatalogItem = productFrontPath
      ? productFrontPath.split("/")[1]
      : null;
    if (existingCatalogItem !== catalogItem) {
      dispatch(setProgressBarValue(1));
    }
  }, [productFrontPath, catalogItem, dispatch]);

  useEffect(() => {
    handleInitialProgress();
  }, [handleInitialProgress]);

  return (
    <div className="w-full md:4/5 lg:w-2/3 my-10">
      {/* <h1>{catalog}</h1>
      <h1>{catalogItem}</h1> */}
      {progressBarValue === 1 && <ImageUploaderTwo />}
      {progressBarValue === 2 && (
        <ImagePlacementTwo catalog={catalog} catalogItem={catalogItem} />
      )}
      {progressBarValue === 3 && (
        <ImageFinalisation catalog={catalog} catalogItem={catalogItem} />
      )}
    </div>
  );
};

export default ApparelPage;

import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
  productType: string; // "T-Shirts", "Polos", "Hoodies" -- catalogItem
  productFrontPath: string; // change apparel color front image
  productBackPath?: string; // change apparel color back image
  uploadedImageSizePrimary: string; // user uploaded design front-size
  uploadedImageSizeSecondary?: string; // user uploaded design back-size
  productColor: string; // red, blue, black, green
  productSize: string; //"S", "M", "L"
  productPrice: number; // constant based on apparel type
  designPriceFront: number; // right now it is based on designSize -- same front and back
  designPriceBack?: number; // right now it is based on designSize -- same front and back
}

const initialState: ProductState = {
  productColor: "Black", //
  productSize: "S",
  productType: "",
  uploadedImageSizePrimary: "S", //
  uploadedImageSizeSecondary: "S",
  designPriceFront: 200,
  designPriceBack: 200,
  productFrontPath: "", //
  productBackPath: "", //
  productPrice: 800,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setColor(state, action) {
      state.productColor = action.payload;
    },
    setProductPath(state, action) {
      state.productFrontPath = action.payload.front;
      state.productBackPath = action.payload.back;
    },
    setSize(state, action) {
      state.productSize = action.payload;
    },
    setUploadedImagePrimarySize(state, action) {
      state.uploadedImageSizePrimary = action.payload;
    },
    setUploadedImageSecondarySize(state, action) {
      state.uploadedImageSizeSecondary = action.payload;
    },
    setProductPrice(state, action) {
      state.productPrice = action.payload;
    },
    setDesignPriceFront(state, action) {
      state.designPriceFront = action.payload;
    },
    setDesignPriceBack(state, action) {
      state.designPriceBack = action.payload;
    },
    setProductType(state, action) {
      state.productType = action.payload;
    },
  },
});
export const {
  setProductType,
  setColor,
  setSize,
  setUploadedImagePrimarySize,
  setUploadedImageSecondarySize,
  setDesignPriceFront,
  setDesignPriceBack,
  setProductPath,
  setProductPrice,
} = productSlice.actions;
export default productSlice.reducer;

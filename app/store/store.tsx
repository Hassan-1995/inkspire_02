import { configureStore } from "@reduxjs/toolkit";
import uploadedImageReducer from "./slices/uploadedImageSlice";
import progressBarValueReducer from "./slices/progressBarSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    uploadedImage: uploadedImageReducer,
    progressBar: progressBarValueReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

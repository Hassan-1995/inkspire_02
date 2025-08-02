import { createSlice } from "@reduxjs/toolkit";

interface UploadedImageState {
  uploadedImagePrimary: string;
  uploadedImageSecondary: string;
}

const initialState: UploadedImageState = {
  uploadedImagePrimary: "",
  uploadedImageSecondary: "",
};

export const uploadedImageSlice = createSlice({
  name: "uploadedImage",
  initialState,
  reducers: {
    setPrimaryImage(state, action) {
      state.uploadedImagePrimary = action.payload;
    },
    setSecondaryImage: (state, action) => {
      state.uploadedImageSecondary = action.payload;
    },
    clearUploadedImage(state) {
      state.uploadedImagePrimary = "";
      state.uploadedImageSecondary = "";
    },
  },
});

export const { setPrimaryImage, setSecondaryImage, clearUploadedImage } =
  uploadedImageSlice.actions;
export default uploadedImageSlice.reducer;

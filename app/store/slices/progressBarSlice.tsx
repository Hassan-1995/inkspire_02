import { createSlice } from "@reduxjs/toolkit";

interface ProgressBarState {
  progressBarValue: number;
}
const initialState: ProgressBarState = {
  progressBarValue: 1,
};

export const progressBarSlice = createSlice({
  name: "progressBar",
  initialState,
  reducers: {
    setProgressBarValue(state, action) {
      state.progressBarValue = action.payload;
    },
  },
});

export const { setProgressBarValue } = progressBarSlice.actions;
export default progressBarSlice.reducer;

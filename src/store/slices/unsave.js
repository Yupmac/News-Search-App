import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  isLoading: false,
  keyWord: "",
  page: 1,
};

export const unsaveSlice = createSlice({
  name: "unsave",
  initialState: initalState,
  reducers: {
    setKeyWord: (state, action) => {
      state.keyWord = action.payload.word;
    },
    toggleIsLoading: (state, action) => {
      state.isLoading = action.payload.state;
    },
    setPage: (state, action) => {
      state.page = action.payload.page;
    },
  },
});

export const { setKeyWord, toggleIsLoading, setPage } = unsaveSlice.actions;

export default unsaveSlice.reducer;

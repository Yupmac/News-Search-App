import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  everyArticles: [],
  clippedArticles: [],
  history: [],
  isMainPage: true,
};

export const saveSlice = createSlice({
  name: "save",
  initialState: initalState,
  reducers: {
    setEveryArticles: (state, action) => {
      const clippedArticles = state.clippedArticles;
      const data = action.payload.data;
      state.everyArticles = data.map((each) =>
        !!clippedArticles.find((clip) => clip.id === each.id)
          ? { ...each, clipped: true }
          : each,
      );
    },
    setMoreArticles: (state, action) => {
      const clippedArticles = state.clippedArticles;
      let data = action.payload.data;
      data = data.map((each) =>
        !!clippedArticles.find((clip) => clip.id === each.id)
          ? { ...each, clipped: true }
          : each,
      );
      state.everyArticles = state.everyArticles.concat(data);
    },
    toggleClippedArticles: (state, action) => {
      const chosen = action.payload.chosen;
      const id = chosen.id;

      if (!chosen.clipped) {
        state.clippedArticles.push({ ...chosen, clipped: true });
        state.everyArticles = state.everyArticles.map((article) =>
          article.id === id ? { ...article, clipped: true } : article,
        );
      } else {
        state.clippedArticles = state.clippedArticles.filter(
          (article) => article.id !== id,
        );
        state.everyArticles = state.everyArticles.map((article) =>
          article.id === id ? { ...article, clipped: false } : article,
        );
      }
    },
    setHistory: (state, action) => {
      const word = action.payload.word;
      if (state.history.includes(word)) {
        state.history = state.history.filter((each) => each !== word);
      }
      if (state.history.length >= 5) {
        state.history.pop();
      }
      state.history.unshift(word);
    },
    deleteHistory: (state, action) => {
      const word = action.payload.word;
      state.history = state.history.filter((each) => each !== word);
    },
    togglePages: (state, action) => {
      state.isMainPage = action.payload.state;
    },
  },
});

export const {
  setEveryArticles,
  setMoreArticles,
  toggleClippedArticles,
  setHistory,
  deleteHistory,
  togglePages,
} = saveSlice.actions;

export default saveSlice.reducer;

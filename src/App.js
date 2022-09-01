import React, { useState, useEffect } from "react";
import { getArticles } from './api/modifyAPI';
// import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ClippedPage from "./page/ClippedPage";
import MainPage from "./page/MainPage";

let persistor = persistStore(store);

function App() {

  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  // const dispatch = useDispatch();

  useEffect(() => {

    const fetch = async () => {
      const data = await getArticles({
        q: query,
      });
      setData(data);
    }
    fetch();
  }, [query]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage setKeyword={setQuery} data={data} />} />
            <Route path="/clip" element={<ClippedPage />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

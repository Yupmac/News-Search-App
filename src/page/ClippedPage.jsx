import React, { useEffect } from "react";
import Header from "../component/header/Header";
import ArticleList from "../component/article/ArticleList";
import { useDispatch } from "react-redux";
import { togglePages } from "../store/slices/save";

export default function ClippedPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(togglePages({ state: false }));
  }, [dispatch]);

  return (
    <>
      <Header />
      <ArticleList />
    </>
  );
}

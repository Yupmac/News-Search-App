import React from "react";
import InputField from "../component/searchInput/InputField";
import Header from "../component/header/Header";
import ArticleList from "../component/article/ArticleList";

export default function MainPage() {
  return (
    <>
      <Header />
      <InputField />
      <ArticleList />
    </>
  );
}

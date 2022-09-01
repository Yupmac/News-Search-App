import React from "react";
import { SearchField } from "../component/searchInput/SearchField";
import Header from "../component/header/Header";
import ArticleList from "../component/article/ArticleList";

export default function MainPage({ setQuery }) {
  return (
    <>
      <Header />
      <SearchField setKeyword={ setQuery }/>
      <ArticleList />
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { getArticles } from '.././api/불러온 API 다듬는 기계';
// import { useDispatch } from "react-redux";
// import { setEveryArticles, setHistory } from "../../store/slices/save";
// import {
//   toggleIsLoading,
//   setSearchWord,
//   setPage,
// } from "../../store/slices/unsave";

const 출력컴포넌트 = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  // const dispatch = useDispatch();

  useEffect(() => {

    const fetch = async () => {
      const data = await getArticles({
        q: query,
        page: 1,
      });
      setData(data);
    }
    fetch();
  }, []);

  return (
    <>

    </>
  );
};

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import History from "./History";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getNewsData } from "../../utils/getNewsData";
import { setEveryArticles, setHistory } from "../../store/slices/save";
import {
  toggleIsLoading,
  setKeyWord,
  setPage,
} from "../../store/slices/unsave";

const InputBarContainerSt = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 12vh;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const InputFormSt = styled.form`
  position: relative;
  align-items: center;
`;

const InputSt = styled.input`
  align-items: center;
  width: 20rem;
  height: 1.3rem;
  padding: 0.5rem 3.5rem 0.5rem 2rem;
  border: 1px solid black;
  border-radius: 2rem;

  &:hover {
    background-color: #f6f6f6;
    border: 2px solid black;
  }

  &:focus {
    border: 2px solid rgb(140, 140, 140);
    outline: none;
    font-size: 18px;
  }
`;
const IconSt = styled.div`
  position: absolute;
  top: 0.65rem;
  right: 1.5rem;
`;

let timer;
export default function InputField() {
  const [keyword, setKeyword] = useState("");
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const showHistory = () => {
    setShow(true);
  };

  const hideHistory = () => {
    if (!isShowHistory) setShow(false);
  };

  const showHistoryHandler = () => {
    setIsShowHistory(true);
  };
  const hideHistoryHandler = () => {
    setIsShowHistory(false);
  };

  const saveDataInStore = (data) => {
    dispatch(setKeyWord({ word: keyword }));
    dispatch(setPage({ page: 1 }));
    dispatch(setEveryArticles({ data: data }));
    dispatch(setHistory({ word: keyword }));
  };

  useEffect(() => {
    if (!!keyword.trim()) {
      timer = setTimeout(async () => {
        dispatch(toggleIsLoading({ state: true }));
        const data = await getNewsData(keyword, 1);
        saveDataInStore(data);
        dispatch(toggleIsLoading({ state: false }));
      }, 500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, keyword]);

  return (
    <InputBarContainerSt>
      <InputFormSt onSubmit={(e) => e.preventDefault()}>
        <InputSt
          type="text"
          value={keyword}
          onChange={handleKeyword}
          autoFocus
          onClick={showHistory}
          onBlur={hideHistory}
        />
        <IconSt>
          <FaSearch />
        </IconSt>
      </InputFormSt>
      {show && (
        <History
          onShowHistory={showHistoryHandler}
          onHideHistory={hideHistoryHandler}
        />
      )}
    </InputBarContainerSt>
  );
}

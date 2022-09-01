import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { SearchTag } from "./SearchTag";
// import { useDispatch, useSelector } from "react-redux";
// import { getNewsData } from "../../api/getNewsData";
// import { setEveryArticles, setHistory } from "../../store/slices/save";
// import {
//   toggleIsLoading,
//   setSearchWord,
//   setPage,
// } from "../../store/slices/unsave";

const SearchFieldContainerSt = styled.div`
  position: fixed;
  top: 12vh;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InputFormSt = styled.form`
  position: relative;
  align-items: center;
 `
 
const InputBarSt = styled.input`
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
 `
const InputIconSt = styled.div`
  position: absolute;
  top: 0.65rem;
  right: 1.5rem;
`

const HistoryContainerSt = styled.div`
  position: absolute;
  top: 40px;
  width: 20rem;
  background-color: #fff;
  margin-top: 0.5rem;
  padding: 0.5rem 1.5rem 1rem;
  box-shadow: 1px 1px 5px #ccc;
`

const HistoryTitleContainerSt = styled.div`
  width: 100%;
  display: flex;
`

const TitleSt = styled.span`
  line-height: 1.5;
  padding-left: 0.5rem;
  font-size: 16px;
`

const IconSt = styled.div`
  margin-left: 0.2rem;
  display: flex;
  align-items: center;
`

const HistoryListContainerSt = styled.ul`
  padding: 0.5rem 0.5rem 0rem;
  padding-right: 1rem;
  border-bottom: 1px solid black;
  ${'' /* overflow: hidden; */}
`

export const SearchField = ({ setQuery }) => {

  const savedSearchTags = localStorage.getItem('searchTags');
  const initialSearchTags = savedSearchTags ? JSON.parse(savedSearchTags) : [];
  const [inputState, setInputState] = useState('');
  const [searchTags, setSearchTags] = useState([initialSearchTags]);
  const [show, setShow] = useState(false);
  const inputValue = (e) => e.target.value;
  const inputRef = useRef(null);
  const updateSearchInput = (value) => {
    inputRef.current.value = value;
  };

  const onChange = setTimeout(() => {
    if (!inputValue) return;
    setQuery(inputValue);
    setSearchTags((prev) => [ ...prev, inputValue ]);
  }, 500);

  const searchTag = (tag) => {
    setQuery(tag);
    updateSearchInput(tag);
  };

  const deleteTag = (idx) => {
    const newSearchTags = [...searchTags];
    newSearchTags.splice(idx, 1);
    setSearchTags(newSearchTags);
  };
  
  useEffect(() => {
    localStorage.setItem('searchTags', JSON.stringify(searchTags));
  }, [searchTags]);

  const showHistory = () => {
    if (!inputValue) return;
    setShow(true);
  };

  const hideHistory = () => {
    setShow(false);
  };


  return (
    <SearchFieldContainerSt>
      <InputFormSt onSubmit={(e) => e.preventDefault()}>
        <InputBarSt
          type="text"
          ref={ inputRef }
          value={ inputState }
          onChange={ (e) => setInputState(e.target.value) }
          onFocus={ showHistory }
          onBlur={ hideHistory }
        />
        <InputIconSt>
          <FaSearch />
        </InputIconSt>
      </InputFormSt>
      { show && 
      <HistoryContainerSt>
        <HistoryTitleContainerSt>
          <TitleSt>Recent Keyword</TitleSt>
          <IconSt><BiTimeFive /></IconSt>
        </HistoryTitleContainerSt>
        <HistoryListContainerSt>
          {searchTags.map((tag, idx) => (
            <SearchTag tag={ tag } searchTag={ () => searchTag(tag) } deleteTag={ deleteTag } />
          ))}
        </HistoryListContainerSt>
      </HistoryContainerSt> 
      }
    </SearchFieldContainerSt>
  );
};
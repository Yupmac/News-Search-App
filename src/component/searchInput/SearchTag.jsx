import React from 'react'
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";

const KeywordListSt = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const KeywordSt = styled.span`
  font-size: 18px;
  font-weight: 400;
`

export const SearchTag = ({ tag, searchTag, deleteTag }) => {
  return (
    <KeywordListSt onClick={ searchTag }>
      <KeywordSt>{ tag }</KeywordSt>
      <MdDeleteForever width='20px' display='flex' align-items='center' float='right' onClick={ deleteTag } />
    </KeywordListSt>
  );
};
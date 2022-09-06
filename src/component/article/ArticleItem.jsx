import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleClippedArticles } from "../../store/slices/save";

/* CSS */
const ArticleItemSection = styled.div`
  margin: 1rem;
  padding-right: 1rem;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  &:nth-child(3n) {
    border: none;
  }
`;
const ArticleHeaderSection = styled.header`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;
const StarButton = styled.button`
  padding: 0.6rem;
  color: ${(props) => (props.active ? "#ffd056" : "#525252")};
  display: flex;
  font-size: 25px;
`;
const ArticleTitle = styled.a`
  overflow: hidden;
  font-weight: bold;
  font-size: 23px;
`;
const ArticleBodySection = styled.div`
  margin-top: 0.8rem;
`;
const ArticleContent = styled.p`
  overflow: hidden;
  margin-top: 0.3rem;
  font-size: 15px;
`;
const ArticleDate = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #8e8e8e;
  margin-top: 0.7rem;
`;

export default function ArticleItem({ article }) {
  const dispatch = useDispatch();

  const { title, content, date, url, clipped } = article;
  const starTogglekHandler = () => {
    dispatch(toggleClippedArticles({ chosen: article }));
  };

  return (
    <ArticleItemSection>
      <ArticleHeaderSection>
        <ArticleTitle href={url} rel="noopener noreferrer" target="_blank">
          {title}
        </ArticleTitle>
        <StarButton
          active={clipped ? true : false}
          onClick={starTogglekHandler}
        >
          <FaStar />
        </StarButton>
      </ArticleHeaderSection>
      <ArticleBodySection>
        <ArticleContent>{content}</ArticleContent>
        <ArticleDate>{date}</ArticleDate>
      </ArticleBodySection>
    </ArticleItemSection>
  );
}

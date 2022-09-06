import styled from "styled-components";
import ArticleItem from "./ArticleItem";
import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowUp } from "react-icons/io";
import { setPage } from "../../store/slices/unsave";
import { getNewsData } from "../../utils/getNewsData";
import { setMoreArticles } from "../../store/slices/save";

/* CSS */
const MainSection = styled.main`
  margin-top: 20vh;
`;
const ArticleSecion = styled.article`
  display: grid;
  margin-top: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  line-height: 1.2;
`;
const EmptyArticleText = styled.h2`
  color: #999;
  margin-top: 10%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const HrStyle = styled.div`
  width: 100%;
  height: 10px;
  margin-top: 40px;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
`;
const ScrollTopBtn = styled.button`
  position: fixed;
  bottom: 4vh;
  right: 4vh;
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  background-color: #000;
  opacity: 0.9;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  &:hover {
    transform: scale(1.1);
    animation: transform 0.5s ease;
  }
`;
const ScrollTopIcon = styled(IoIosArrowUp)`
  color: #fff;
  font-size: 25px;
`;

export default function ArticleList() {
  const { everyArticles, clippedArticles, isMainPage } = useSelector(
    (state) => state.save,
  );

  let { isLoading, page, keyWord } = useSelector((state) => state.unsave);
  const dispatch = useDispatch();
  const observer = useRef();
  const lastArticleElement = useCallback(
    (node) => {
      if (isLoading || !keyWord) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(setPage({ page: ++page }));
          const data = await getNewsData(keyWord, page);
          dispatch(setMoreArticles({ data: data }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading],
  );
  const articles = isMainPage ? everyArticles : clippedArticles;

  const content =
    articles.length === 0 ? (
      <EmptyArticleText>There are no articles.</EmptyArticleText>
    ) : (
      articles.map((article, index) => (
        <div
          key={article.id}
          ref={index === articles.length - 1 ? lastArticleElement : undefined}
        >
          <ArticleItem article={article} />
        </div>
      ))
    );

  const scollTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MainSection>
      <HrStyle />
      <ArticleSecion>
        {isLoading ? <EmptyArticleText>Loading...</EmptyArticleText> : content}
      </ArticleSecion>
      <ScrollTopBtn onClick={scollTopHandler}>
        <ScrollTopIcon />
      </ScrollTopBtn>
    </MainSection>
  );
}

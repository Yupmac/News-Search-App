import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export const getNewsData = async (keyword, page) => {
  if (keyword === "") return;

  const URL = (keyword, page) =>
    `${BASE_URL}?api-key=${API_KEY}&q=${keyword}&page=${page}&begin_date=19800101&sort=relevance`;

  let result = await axios
    .get(URL(keyword, page))
    .then((res) => res.data.response.docs);
  result = result.map((each) => {
    const {
      headline: { main: title },
      pub_date: date,
      snippet: content,
      web_url: url,
      _id: id,
    } = each;
    return { title, date: date.slice(0, 10), content, url, id, clipped: false };
  });
  return result;
};

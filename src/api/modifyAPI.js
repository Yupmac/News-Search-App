import { requestAPI } from './requestAPI';

const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const defaultParam = {
  "api-key" : process.env.REACT_APP_API_KEY,
};

export const getArticles = async (paramObj) => {

  const params = new URLSearchParams({
    ...defaultParam,
    ...paramObj,
  }).toString();

  const result = await requestAPI (
    `${BASE_URL}/?${params}`
  );
  console.log(result);
  return result;

};

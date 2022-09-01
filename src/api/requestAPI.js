import axios from 'axios';

export const requestAPI = async (url) => {
  try {
    const response = await axios.get(url);
    if(response.ok) {
      console.log(response);
      return response;
    }
  } catch(e) {
    console.log(e);
  }
};
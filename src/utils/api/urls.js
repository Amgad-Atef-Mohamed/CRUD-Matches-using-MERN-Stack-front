const BaseUrls = {
  apiUrl: `${process.env.REACT_APP_API_URL}`,
};

const Urls = {
  baseUrl: BaseUrls.apiUrl,
  matches: {
    getAll: `${BaseUrls.apiUrl}/matches`,
    add: `${BaseUrls.apiUrl}/matches`,
    update: `${BaseUrls.apiUrl}/matches`,
    delete: `${BaseUrls.apiUrl}/matches`,
  },
};

export default Urls;

export const handleApiError = (error, setMessage, key) => {
  setMessage(error.response.data.detail[0][key][0]);
};

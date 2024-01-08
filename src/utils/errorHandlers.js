export const handleApiError = (error, setMessage, key) => {
  if (error.response.status === 429) {
    setMessage(error.response.data.detail);
  } else {
    setMessage(error.response.data.detail[0][key][0]);
  }
};

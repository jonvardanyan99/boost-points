export const handleApiError = (error, setMessage, key) => {
  if (typeof error.response.data.detail === 'string') {
    setMessage(error.response.data.detail);
  } else if (Array.isArray(error.response.data.detail)) {
    setMessage(error.response.data.detail[0][key][0]);
  } else {
    setMessage(error.response.data.detail[key][0]);
  }
};

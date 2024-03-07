export const handleApiError = (error, setError, apiKey, formikKey) => {
  const key = formikKey || apiKey;

  if (typeof error.response.data.detail === 'string') {
    setError(key, error.response.data.detail);
  } else if (Array.isArray(error.response.data.detail)) {
    setError(key, error.response.data.detail[0][apiKey][0]);
  } else {
    setError(key, error.response.data.detail[apiKey][0]);
  }
};

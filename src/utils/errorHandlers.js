export const handleApiError = (error, setError, keys) => {
  const { detail } = error.response.data;

  if (typeof detail === 'string') {
    setError(keys[0], detail);
  } else {
    const errorDetails = Array.isArray(detail) ? detail[0] : detail;

    // eslint-disable-next-line array-callback-return
    Object.keys(errorDetails).map(apiKey => {
      if (keys.includes(apiKey)) {
        setError(apiKey, errorDetails[apiKey][0]);
      }
    });
  }
};

export const getFormikError = (formik, key) => {
  if (formik.errors[key] && formik.touched[key]) {
    return formik.errors[key];
  }

  return null;
};

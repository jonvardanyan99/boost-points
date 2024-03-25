import { Snackbar } from 'components/Snackbar';
import React, { useState } from 'react';

export const useErrorHandler = () => {
  const [snackbarText, setSnackbarText] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarText('');
  };

  const handleApiError = (error, setError, keys) => {
    const { detail } = error.response.data;

    if (typeof detail === 'string') {
      setSnackbarText(detail);
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

  return {
    handleApiError,
    snackbar: (
      <Snackbar visible={!!snackbarText} onClose={handleSnackbarClose} text={snackbarText} />
    ),
  };
};

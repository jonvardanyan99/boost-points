import { Snackbar } from 'components/Snackbar';
import React, { useState } from 'react';

const UNEXPECTED_ERROR = 'An unexpected error occurred.';

export const useErrorHandler = () => {
  const [snackbarText, setSnackbarText] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarText('');
  };

  const handleApiError = (error, setError = () => {}, keys = []) => {
    if (error.response && error.response.data) {
      const { detail } = error.response.data;

      if (typeof detail === 'string') {
        setSnackbarText(detail);
      } else {
        const errorDetails = Array.isArray(detail) ? detail[0] : detail;

        // eslint-disable-next-line array-callback-return
        Object.keys(errorDetails).forEach(apiKey => {
          if (keys.includes(apiKey)) {
            setError(apiKey, errorDetails[apiKey][0]);
          } else {
            setSnackbarText(`${apiKey}: ${errorDetails[Object.keys(errorDetails)[0]][0]}`);
          }
        });
      }
    } else {
      setSnackbarText(UNEXPECTED_ERROR);
    }
  };

  return {
    handleApiError,
    snackbar: (
      <Snackbar visible={!!snackbarText} onClose={handleSnackbarClose} text={snackbarText} />
    ),
  };
};

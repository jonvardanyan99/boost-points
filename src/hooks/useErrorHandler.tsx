import { StripeError } from '@stripe/stripe-js';
import { AxiosError, isAxiosError } from 'axios';
import { Snackbar } from 'components/Snackbar';
import React, { useState } from 'react';

type DetailObj = Record<string, string[]>;

interface ErrorResponse {
  detail: string | DetailObj[] | DetailObj;
}

const UNEXPECTED_ERROR = 'An unexpected error occurred.';

export const useErrorHandler = () => {
  const [snackbarText, setSnackbarText] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarText('');
  };

  const handleApiError = (
    error: unknown,
    setError?: (key: string, value: string) => void,
    keys?: string[],
  ) => {
    const typedError = error as AxiosError | StripeError;

    if (isAxiosError<ErrorResponse>(typedError)) {
      if (typedError.response && typedError.response.data) {
        const { detail } = typedError.response.data;

        if (typeof detail === 'string') {
          setSnackbarText(detail);
        } else {
          const errorDetails = Array.isArray(detail) ? detail[0] : detail;

          Object.keys(errorDetails).forEach(apiKey => {
            if (keys && keys.includes(apiKey)) {
              if (setError) {
                setError(apiKey, errorDetails[apiKey][0]);
              }
            } else {
              setSnackbarText(`${apiKey}: ${errorDetails[Object.keys(errorDetails)[0]][0]}`);
            }
          });
        }
      } else {
        setSnackbarText(UNEXPECTED_ERROR);
      }
    } else {
      setSnackbarText(typedError.message || UNEXPECTED_ERROR);
    }
  };

  return {
    handleApiError,
    snackbar: (
      <Snackbar visible={!!snackbarText} onClose={handleSnackbarClose} text={snackbarText} />
    ),
  };
};

import { AxiosPromise } from 'axios';
import { useState } from 'react';

export const useMutation = <TVariables = void, TResponse = void>(
  requestFn: (data: TVariables) => AxiosPromise<TResponse> | Promise<void>,
) => {
  const [loading, setLoading] = useState(false);

  const mutate = async (data: TVariables) => {
    setLoading(true);

    try {
      return await requestFn(data);
    } finally {
      setLoading(false);
    }
  };

  return [mutate, { loading }] as const;
};

import { useState } from 'react';

export const useMutation = requestFn => {
  const [loading, setLoading] = useState(false);

  const mutate = async data => {
    setLoading(true);

    try {
      return await requestFn(data);
    } finally {
      setLoading(false);
    }
  };

  return [mutate, { loading }];
};

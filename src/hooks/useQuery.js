import { useEffect, useState } from 'react';

export const useQuery = requestFn => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const sendQuery = async () => {
      try {
        const response = await requestFn();

        setData(response.data);
      } finally {
        setLoading(false);
      }
    };

    sendQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, data };
};

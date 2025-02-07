import { useEffect, useState } from 'react';

export const useQuery = ({ requestFn, skip }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (!skip) {
      setLoading(true);

      const sendQuery = async () => {
        try {
          const response = await requestFn();

          setData(response.data);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };

      sendQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  return { data, loading };
};

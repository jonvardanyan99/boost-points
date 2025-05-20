import { AxiosPromise } from 'axios';
import { useEffect, useState } from 'react';

interface Params<RequestFn> {
  requestFn: RequestFn;
  skip?: boolean;
}

export const useQuery = <TResponse, RequestFn extends () => AxiosPromise<TResponse>>({
  requestFn,
  skip,
}: Params<RequestFn>) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<RequestFn>>['data']>();

  useEffect(() => {
    if (!skip) {
      setLoading(true);

      const sendQuery = async () => {
        try {
          const response = await requestFn();

          setData(response.data);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          /* empty */
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

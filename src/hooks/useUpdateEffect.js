import { useEffect, useRef } from 'react';

export const useUpdateEffect = ({ dependency, effectFunction }) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      if (!dependency) {
        effectFunction();
      }
    } else {
      isMountedRef.current = true;
    }
  }, [dependency, effectFunction]);
};

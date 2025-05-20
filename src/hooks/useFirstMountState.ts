import { useRef } from 'react';

export const useFirstMountState = () => {
  const isFirstRef = useRef(true);

  if (isFirstRef.current) {
    isFirstRef.current = false;

    return true;
  }

  return isFirstRef.current;
};

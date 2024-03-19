import { useEffect } from 'react';

import { useFirstMountState } from './useFirstMountState';

export const useUpdateEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

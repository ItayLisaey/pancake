import { useEffect, useRef } from 'react';

/** 
 * React's `useEffect()` runs *after* rendering the element. 
 * This hook's behaviour is identical to `useEffect()`, except `fn` is also run
 * before the first render.
 */
export const usePreRenderEffect = (fn: () => void | (() => void), deps: any[]) => {
  const firstRunRef = useRef(true);
  if (firstRunRef.current) {
    fn();
    firstRunRef.current = false;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fn, deps);
};
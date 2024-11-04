import { RefObject, SetStateAction, useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

/**
 * This hook allows you to pass in a ref and get the width and height
 * when the size of the ref changes.
 * Great for handling responsive changes on a per component basis.
 */
export default function useSize(ref: RefObject<HTMLElement>) {
  const [size, setSize] = useState<DOMRectReadOnly>();

  useLayoutEffect(() => {
    if (ref?.current) {
      setSize(ref.current.getBoundingClientRect());
    }
  }, [ref?.current]);

  // Where the magic happens
  useResizeObserver(
    ref,
    (entry: { contentRect: SetStateAction<DOMRectReadOnly | undefined> }) =>
      setSize(entry.contentRect),
  );
  return size;
}

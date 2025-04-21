import { RefObject, useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

/**
 * This hook allows you to pass in a ref and get the width and height
 * when the size of the ref changes.
 * Great for handling responsive changes on a per component basis.
 */
export default function useSize(target: RefObject<HTMLElement>) {
  const [size, setSize] = useState<DOMRectReadOnly>();

  useLayoutEffect(() => {
    setSize(target.current?.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => {
    setSize(entry.contentRect);
  });
  return size;
}

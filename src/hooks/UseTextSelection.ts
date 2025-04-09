import { useCallback, useLayoutEffect, useState } from 'react';

export type ClientRect = Record<keyof Omit<DOMRect, 'toJSON'>, number>;

function calcBounding(rects: DOMRectList): ClientRect {
  const x: number[] = [];
  const y: number[] = [];
  const width: number[] = [];
  const height: number[] = [];

  for (const [_, value] of Object.entries(rects)) {
    x.push(value.x);
    y.push(value.y);
    width.push(value.width);
    height.push(value.height);
  }

  const newX = Math.min(...x);
  const newY = Math.min(...y);
  const newWidth = Math.max(...width);
  const newHeight = height.reduce((a, b) => a + b, 0);

  return {
    x: newX,
    y: newY,
    width: newWidth,
    height: newHeight,
    left: newX,
    top: newY,
    right: newX + newWidth,
    bottom: newY + newHeight,
  };
}

function roundValues(_rect: ClientRect) {
  const rect = {
    ..._rect,
  };
  for (const key of Object.keys(rect)) {
    // @ts-ignore
    rect[key] = Math.round(rect[key]);
  }
  return rect;
}

function shallowDiff(prev: any, next: any) {
  if (prev != null && next != null) {
    for (const key of Object.keys(next)) {
      if (prev[key] != next[key]) {
        return true;
      }
    }
  } else if (prev != next) {
    return true;
  }
  return false;
}

type TextSelectionState = {
  clientRect?: ClientRect;
  isCollapsed?: boolean;
  textContent?: string;
};

const defaultState: TextSelectionState = {};

/**
 * useTextSelection(ref)
 *
 * @description
 * hook to get information about the current text selection
 *
 */
export function useTextSelection(target?: HTMLElement) {
  const [{ clientRect, isCollapsed, textContent }, setState] =
    useState<TextSelectionState>(defaultState);

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

  const handler = useCallback(() => {
    let newRect: ClientRect;
    const selection = window.getSelection();
    const newState: TextSelectionState = {};

    if (selection == null || !selection.rangeCount) {
      setState(newState);
      return;
    }

    const range = selection.getRangeAt(0);

    if (target != null && !target.contains(range.commonAncestorContainer)) {
      setState(newState);
      return;
    }

    if (range == null) {
      setState(newState);
      return;
    }

    const contents = range.cloneContents();

    if (contents.textContent != null) {
      newState.textContent = contents.textContent;
    }

    const rects = range.getClientRects();

    if (rects.length === 0 && range.commonAncestorContainer != null) {
      const el = range.commonAncestorContainer as HTMLElement;
      newRect = roundValues(el.getBoundingClientRect().toJSON());
    } else {
      if (rects.length < 1) return;
      newRect = calcBounding(rects);
    }

    if (shallowDiff(clientRect, newRect)) {
      newState.clientRect = newRect;
    }

    newState.isCollapsed = range.collapsed;

    setState(newState);
  }, [target]);

  useLayoutEffect(() => {
    target?.addEventListener('scroll', handler);
    document.addEventListener('scroll', handler);
    document.addEventListener('selectionchange', handler);
    document.addEventListener('keydown', handler);
    document.addEventListener('keyup', handler);
    window.addEventListener('resize', handler);

    return () => {
      target?.removeEventListener('scroll', handler);
      document.removeEventListener('scroll', handler);
      document.removeEventListener('selectionchange', handler);
      document.removeEventListener('keydown', handler);
      document.removeEventListener('keyup', handler);
      window.removeEventListener('resize', handler);
    };
  }, [target]);

  return {
    clientRect,
    isCollapsed,
    textContent,
    reset,
  };
}

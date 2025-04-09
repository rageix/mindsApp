import BasicController from '@/util/BasicController';
import { RefObject, useLayoutEffect } from 'react';

type ClientRect = Record<keyof Omit<DOMRect, 'toJSON'>, number>;

export interface ISelection {
  text: string;
  rect: ClientRect;
  visible: boolean;
  target?: RefObject<HTMLElement>;
}

export interface IState extends ISelection {}

export function newIState(): IState {
  return {
    text: '',
    rect: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    visible: false,
  };
}

export default class SelectionController extends BasicController<IState> {
  defaultState = newIState();

  constructor(target?: RefObject<HTMLElement>) {
    super();
    this.defaultState.target = target;
  }

  useController =() => {
    this._useController();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      document.addEventListener('scroll', this.onUpdate);
      document.addEventListener('selectionchange', this.onUpdate);
      document.addEventListener('keydown', this.onUpdate);
      document.addEventListener('keyup', this.onUpdate);
      window.addEventListener('resize', this.onUpdate);

      return () => {
        document.removeEventListener('scroll', this.onUpdate);
        document.removeEventListener('selectionchange', this.onUpdate);
        document.removeEventListener('keydown', this.onUpdate);
        document.removeEventListener('keyup', this.onUpdate);
        window.removeEventListener('resize', this.onUpdate);
      };
    }, []);
  }

  calcBounding = (rects: DOMRectList): ClientRect => {
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
  };

  roundValues = (_rect: ClientRect) => {
    const rect = {
      ..._rect,
    };
    for (const key of Object.keys(rect)) {
      // @ts-ignore
      rect[key] = Math.round(rect[key]);
    }
    return rect;
  };

  onUpdate = () => {
    let rect: ClientRect;
    const selection = window.getSelection();

    if (selection == null || !selection.rangeCount) {
      this.setState({ visible: false });
      return;
    }

    const range = selection.getRangeAt(0);

    if (
      this.state.target?.current &&
      !this.state.target?.current.contains(range.commonAncestorContainer)
    ) {
      this.setState({ visible: false });
      return;
    }

    if (range == null) {
      this.setState({ visible: false });
      return;
    }

    const rects = range.getClientRects();

    if (rects.length === 0 && range.commonAncestorContainer != null) {
      const el = range.commonAncestorContainer as HTMLElement;
      rect = this.roundValues(el.getBoundingClientRect().toJSON());
    } else {
      if (rects.length < 1) return;
      rect = this.calcBounding(rects);
    }

    // newState.isCollapsed = range.collapsed;
    const text = selection.toString();

    this.setState({
      text,
      rect,
      visible: text.length > 0,
    });
  };

  setTarget = (target?: RefObject<HTMLElement>) => {
    this.setState({ target });
  };
}

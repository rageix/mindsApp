// import { FederatedPointerEvent } from 'pixi.js';
import { Text } from '@pixi/react';

// interface IProps {
//   // x: number;
//   // y: number;
//   width: number;
//   height: number;
//   fillColor: string;
//   fillAlpha?: number;
//   html: string,
//   // borderColor?: string;
//   // borderWidth?: number;
//   // borderRadius?: number;
//   // onClick?: (e: MouseEvent) => void;
//   onMouseDown?: (e?: FederatedPointerEvent) => void;
//   // onMouseOver?: (e?: FederatedPointerEvent) => void;
//   onMouseOut?: (e?: FederatedPointerEvent) => void;
//   // onMouseLeave?: (e?: FederatedPointerEvent) => void;
//   // onMouseEnter?: (e?: FederatedPointerEvent) => void;
//   // onMouseMove?: (e?: FederatedPointerEvent) => void;
//   // onMouseUp?: (e?: FederatedPointerEvent) => void;
//   // onMouseUpOutside?: (e?: FederatedPointerEvent) => void;
//   // eventMode?: EventMode
// }

// const FONT_FAMILY = '__GeistSans_3a0388, sans-serif';
// const FONT_SIZE = 50;

export default function TextBlock() {
  // const fontMetrics = useMemo(
  //   () => getFontMetrics(FONT_FAMILY, FONT_SIZE),
  //   [FONT_FAMILY, FONT_SIZE],
  // );

  return <>
      <Text text="<b>This is strong</b>"/>
  </>;
}

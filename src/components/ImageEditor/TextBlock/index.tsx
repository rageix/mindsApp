import { useMemo } from 'react';
import { SerializedEditorState } from 'lexical';
import { FederatedPointerEvent } from 'pixi.js';
import { TextPlotter } from '@/util/TextPlotter';
import { Container } from '@pixi/react';

interface IProps {
  // x: number;
  // y: number;
  width: number;
  height: number;
  fillColor: string;
  fillAlpha?: number;
  editorState: SerializedEditorState;
  // borderColor?: string;
  // borderWidth?: number;
  // borderRadius?: number;
  // onClick?: (e: MouseEvent) => void;
  onMouseDown?: (e?: FederatedPointerEvent) => void;
  // onMouseOver?: (e?: FederatedPointerEvent) => void;
  onMouseOut?: (e?: FederatedPointerEvent) => void;
  // onMouseLeave?: (e?: FederatedPointerEvent) => void;
  // onMouseEnter?: (e?: FederatedPointerEvent) => void;
  // onMouseMove?: (e?: FederatedPointerEvent) => void;
  // onMouseUp?: (e?: FederatedPointerEvent) => void;
  // onMouseUpOutside?: (e?: FederatedPointerEvent) => void;
  // eventMode?: EventMode
}

const FONT_FAMILY = '__GeistSans_3a0388, sans-serif';
const FONT_SIZE = 50;

export default function TextBlock(props: IProps) {
  // const fontMetrics = useMemo(
  //   () => getFontMetrics(FONT_FAMILY, FONT_SIZE),
  //   [FONT_FAMILY, FONT_SIZE],
  // );

  const draw = useMemo(() => {
    const plotter = new TextPlotter();

    for (const rootChild of props.editorState.root.children) {
      if (rootChild.type === 'paragraph') {
        console.log('rootChild', rootChild);

        // @ts-ignore
        for (const paragraphChild of rootChild?.children || []) {
          if (paragraphChild.type === 'text') {
            const text = paragraphChild.text as string;
            plotter.plotText({
              text,
              fontFamily: FONT_FAMILY,
              fontSize: FONT_SIZE,
              fillColor: '#000000',
              maxWidth: props.width
            });
          }
        }
      }
    }

    return plotter.items;
  }, [props.editorState]);

  return <>
    <Container x={props.width / -2} y={props.height / -2}>
    {draw}
    </Container>
  </>;
}

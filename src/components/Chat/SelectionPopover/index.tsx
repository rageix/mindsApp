import {
  CSSProperties,
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import SelectionController from '@/components/Chat/SelectionController';
import { MessageCircleIcon, ScissorsIcon } from 'lucide-react';
import useSize from '@/hooks/UseSize';
import { cn } from '@/util/Cn';

export interface IProps {
  controller: SelectionController;
  mountRef?: RefObject<HTMLElement>;
  onClickClip?: (text: string) => void;
  onClickMessage?: (text: string) => void;
}

function Portal(props: PropsWithChildren<{ mount?: HTMLElement | null }>) {
  return createPortal(props.children, props.mount || document.body);
}

export default function SelectionPopover({
  controller,
  mountRef,
  onClickClip,
  onClickMessage,
}: IProps) {
  const ref = useRef(null);
  const [elem, setElem] = useState<HTMLElement | undefined | null>();
  const [style, setStyle] = useState<CSSProperties>();
  controller.useController();
  const { state } = controller;
  const { text, rect, visible } = state;
  const size = useSize(ref);

  useEffect(() => {
    setStyle({
      left: `${rect.left + rect.width / 2 - (size?.width || 0) / 2}px`,
      top: `${rect.top - 60}px`,
    });
  }, [rect, size?.width]);

  useEffect(() => {
    setElem(mountRef?.current);
  }, [mountRef?.current]);

  const onClickClipLocal = () => {
    if (onClickClip) {
      onClickClip(text);
    }
  };

  const onClickMessageLocal = () => {
    if (onClickMessage) {
      onClickMessage(text);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Portal mount={elem}>
      <div
        ref={ref}
        style={style}
        className="absolute flex text-center z-10"
      >
        <span className="isolate inline-flex rounded-md shadow-sm">
          {onClickClip && (
            <button
              type="button"
              className={cn(
                'relative inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10',
                onClickMessage ? 'rounded-l-md' : 'rounded-md',
              )}
              onClick={onClickClipLocal}
            >
              <span className="sr-only">Clip</span>
              <ScissorsIcon />
            </button>
          )}
          {/*<button*/}
          {/*  type="button"*/}
          {/*  className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"*/}
          {/*>*/}
          {/*              <MessageCircleIcon/>*/}

          {/*</button>*/}
          {onClickMessage && (
            <button
              type="button"
              className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              onClick={onClickMessageLocal}
            >
              <span className="sr-only">Message</span>
              <MessageCircleIcon />
            </button>
          )}
        </span>
      </div>
    </Portal>
  );
}

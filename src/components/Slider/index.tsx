import { MouseEvent, useEffect, useRef, useState } from 'react';
import { cn } from '@/util/Cn';
import { MOUSE_LEFT } from '@/common/Mouse';
import { CircleIcon } from 'lucide-react';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';

interface IProps {
  value: number;
  // min: number;
  // max: number;
  onChange: (value: number) => void;
  className?: string;
  handleSize?: number;
  innerClassName?: string;
}

export default function Slider({
  value,
  onChange,
  className,
  handleSize = 10,
  innerClassName,
}: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const mouseDownRef = useRef(false);

  function onHandleMouseDown() {
    mouseDownRef.current = true;
  }

  function onHandleMouseUp() {
    mouseDownRef.current = false;
  }

  function onMouseMove(e: MouseEvent) {
    if (!ref.current || !mouseDownRef.current) {
      return;
    }

    if (mouseDownRef.current) {
      // prevent accidentally selecting other things during drag
      e.stopPropagation();
      e.preventDefault();
      const sliderRect = ref.current.getBoundingClientRect();
      const width = sliderRect.width;
      const startX = sliderRect.x;
      const currentX = e.clientX;
      const positionX = currentX - startX;
      const ratio = positionX / width;

      onChange(limitNumberWithinRange(ratio, 0, 1));
    }
  }

  function onMouseDown(e: MouseEvent) {
    onHandleMouseDown();
    onMouseMove(e);
  }

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (e.button === MOUSE_LEFT) {
        onHandleMouseUp();
      }
    };

    // @ts-ignore
    // defs have to be wrong
    window.addEventListener('mouseup', fn);
    // @ts-ignore
    return () => window.removeEventListener('mouseup', fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (e.button === MOUSE_LEFT) {
        onMouseMove(e);
      }
    };
    // @ts-ignore
    // defs have to be wrong
    window.addEventListener('mousemove', fn);
    return () => {
      // @ts-ignore
      window.removeEventListener('mousemove', fn);
    };
  }, [onChange]);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width - handleSize);
    }
  }, [ref.current]);

  const left = (width + handleSize) * value;
  const halfHandle = handleSize / 2;

  return (
    <div
      className={cn('', className)}
      style={{ paddingLeft: halfHandle, paddingRight: halfHandle }}
    >
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        className={cn('flex items-center w-full', innerClassName)}
      >
        <span
          className={'relative text-white hover:text-gray-200'}
          style={{ left: left - halfHandle }}
          onMouseDown={onHandleMouseDown}
        >
          {/*<CircleIcon fill="#ffff" size={handleSize} />*/}
          <CircleIcon size={handleSize} />
        </span>
      </div>
    </div>
  );
}

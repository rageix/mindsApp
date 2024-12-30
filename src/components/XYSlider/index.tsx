import {
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MOUSE_LEFT } from '@/common/Mouse';
import { CircleIcon } from 'lucide-react';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';
import { IVector2 } from '@/types/Vectors';
import { cn } from '@/util/Cn';

interface IProps extends PropsWithChildren {
  value: IVector2;
  onChange: (value: IVector2) => void;
  className?: string;
  handleSize?: number;
}

export default function XYSlider({
  value,
  onChange,
  className,
  handleSize = 10,
  children,
}: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
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
      const xRatio = positionX / width;

      const height = sliderRect.height;
      const startY = sliderRect.y;
      const currentY = e.clientY;
      const positionY = currentY - startY;
      const yRatio = positionY / height;

      const out: IVector2 = {
        x: limitNumberWithinRange(xRatio, 0, 1),
        y: limitNumberWithinRange(yRatio, 0, 1),
      };

      onChange(out);
    }
  }

  function onClick(e: MouseEvent) {
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
      setWidth(ref.current.getBoundingClientRect().width);
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [ref.current]);

  const left = width * value.x;
  const top = height * value.y;

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      onMouseDown={onClick}
    >
      <span
        className="absolute z-10 text-white hover:text-gray-200"
        style={{ left: left - handleSize / 2, top: top - handleSize / 2 }}
        onMouseDown={onHandleMouseDown}
      >
        {/*<CircleIcon fill="#ffff" size={handleSize} />*/}
        <CircleIcon size={handleSize} />
      </span>
      {children}
    </div>
  );
}

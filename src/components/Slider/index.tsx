import { MouseEvent, useEffect, useRef, useState } from 'react';
import { cn } from '@/util/Cn';
import { MOUSE_LEFT } from '@/common/Mouse';
import { CircleIcon } from 'lucide-react';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';

interface IProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  className?: string;
  handleSize?: number;
}

export default function Slider({
  value,
  min,
  max,
  onChange,
  className,
  handleSize = 10,
}: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [handleX, setHandleX] = useState(0);
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
      const width = sliderRect.width - handleSize;
      const startX = sliderRect.x;
      const currentX = e.clientX;
      const positionX = currentX - startX;
      const ratio = positionX / width;
      const num = (max - min) * ratio;

      onChange(limitNumberWithinRange(num, min, max));
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
    if (!ref.current) {
      return;
    }

    const width = ref.current.getBoundingClientRect().width - handleSize;
    const ratio = value / (max - min);
    const newX = width * ratio;
    setHandleX(newX);
  }, [value, ref.current]);

  return (
    <div
      ref={ref}
      className={cn('flex items-center', className)}
      onMouseDown={onClick}
    >
      <span
        className="relative text-white hover:text-gray-200"
        style={{ left: handleX }}
        onMouseDown={onHandleMouseDown}
      >
        {/*<CircleIcon fill="#ffff" size={handleSize} />*/}
        <CircleIcon size={handleSize} />
      </span>
    </div>
  );
}

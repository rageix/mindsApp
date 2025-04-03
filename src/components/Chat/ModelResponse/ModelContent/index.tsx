import { EModelContentType, IModelContent } from '@/types/HistoryItem';
import { useEffect, useState } from 'react';
import Alert from '@/components/Alert';
import ProtectedImage from '@/components/ProtectedImage';
import { cn } from '@/util/Cn';

interface IProps {
  content: IModelContent[];
}

export function ModelContent({ content }: IProps) {
  const [text, setText] = useState<IModelContent[]>([]);
  const [images, setImages] = useState<IModelContent[]>([]);
  const [refusals, setRefusals] = useState<IModelContent[]>([]);

  useEffect(() => {
    const text = content.filter((v) => v.type === EModelContentType.Text);
    const images = content.filter((v) => v.type === EModelContentType.Image);
    const refusals = content.filter(
      (v) => v.type === EModelContentType.Refusal,
    );

    setText(text);
    setImages(images);
    setRefusals(refusals);
  }, [content]);

  return (
    <div className="flex flex-col gap-y-4">
      <div
        className={cn(
          'flex flex-col gap-y-2',
          text.length === 0 ? 'hidden' : null,
        )}
      >
        {text.map((v, i) => (
          <p key={i}>{v.value}</p>
        ))}
      </div>
      <div
        className={cn(
          'flex flex-col gap-y-2',
          refusals.length === 0 ? 'hidden' : null,
        )}
      >
        {refusals.map((v, i) => (
          <Alert
            key={i}
            variant="red"
          >
            {v.value}
          </Alert>
        ))}
      </div>
      <div
        className={cn(
          'flex flex-col gap-y-2',
          images.length === 0 ? 'hidden' : null,
        )}
      >
        {images.map((v, i) => (
          <ProtectedImage
            key={i}
            _id={v.value}
            alt="Image"
          >
            {v.value}
          </ProtectedImage>
        ))}
      </div>
    </div>
  );
}

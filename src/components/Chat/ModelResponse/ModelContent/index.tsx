import { EModelContentType, IModelContent } from '@/types/HistoryItem';
import { useEffect, useRef, useState } from 'react';
import Alert from '@/components/Alert';
import ProtectedImage from '@/components/ProtectedImage';
import { cn } from '@/util/Cn';
import Markdown from 'react-markdown';

interface IProps {
  content: IModelContent[];
}

export function ModelContent({ content }: IProps) {
  const [text, setText] = useState<IModelContent[]>([]);
  const [images, setImages] = useState<IModelContent[]>([]);
  const [refusals, setRefusals] = useState<IModelContent[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  // const [selectionController] = useState(new SelectionController());
  // selectionController.useController();
  // const { state } = selectionController;

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

  // console.log(state);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-y-4"
      // onMouseUp={() => selectionController.onMouseUp(ref)}
    >
      <div
        className={cn(
          'flex flex-col gap-y-2',
          text.length === 0 ? 'hidden' : null,
        )}
      >
        <Markdown>{text.map((v) => v.value).join('')}</Markdown>
        {/*{text.map((v, i) => (*/}
        {/*  <p key={i}>{v.value}</p>*/}
        {/*))}*/}
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
      {/*<div*/}
      {/*  className={cn('absolute', !state.visible ? 'hidden' : null)}*/}
      {/*  style={{ top: `${state.x}px`, left: `${state.y}px` }}*/}
      {/*>*/}
      {/*  <Button variant="blue">Add it</Button>*/}
      {/*</div>*/}
    </div>
  );
}

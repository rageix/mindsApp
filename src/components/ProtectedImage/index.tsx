import { MongoId } from '@/types/MongoDocument';
import { useEffect, useRef, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { getApiFiles } from '@/requests/api/files';
import useIsVisible from '@/hooks/UseIsVisible';

// const apiRoute = process.env.NEXT_PUBLIC_API_HOST + '/api/files/';
//
// function makeUrl(_id: MongoId) {
//   return apiRoute + _id;
// }

interface IProps extends Omit<ImageProps, 'src'> {
  _id: MongoId;
}

export default function ProtectedImage(props: IProps) {
  const [src, setSrc] = useState<string | undefined>();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIsVisible(ref);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    (async () => {
      const response = await getApiFiles(props._id);

      if (!response) {
        return;
      }

      setSrc(response.url);
    })();
  }, [isInView]);

  if (!src) {
    return <div ref={ref}></div>;
  }

  return (
    <Image
      {...props}
      src={src}
      alt="Protected Image"
    />
  );
}

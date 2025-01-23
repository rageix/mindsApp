import { getApiFiles } from '@/requests/api/files';
import { Image } from '@react-pdf/renderer';
import { useMemo } from 'react';

interface IProps {
  id: string
}

export default function TemplateImage({ id }: IProps) {

  const url = useMemo(async () => {
    const response = await getApiFiles(id);

    if (!response) {
      return;
    }

    return response.url;
  }, [id]);

  if(!url) {
    return null;
  }

  return (
    <Image src={url} style={{width: "100%", height: "auto"}}/>
  )

}

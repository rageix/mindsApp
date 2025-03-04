import { usePDFSlick } from '@pdfslick/react';
import PDFNavigation from '@/components/ResumeBuilder/Renderer/PDFNavigation';

interface IProps {
  data: ArrayBuffer;
}

export default function PDFDisplay({ data }: IProps) {
  const { viewerRef, usePDFSlickStore, PDFSlickViewer } = usePDFSlick(data, {
    scaleValue: 'fit-page',
    singlePageViewer: true,
  });

  return (
    <>
      <PDFSlickViewer {...{ viewerRef, usePDFSlickStore }} />
      <PDFNavigation {...{ usePDFSlickStore }} />
    </>
  );
}

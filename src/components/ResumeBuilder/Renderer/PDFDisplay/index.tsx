import { usePDFSlick } from '@pdfslick/react';
import PDFNavigation from '@/components/ResumeBuilder/Renderer/PDFNavigation';

interface IProps {
  data: ArrayBuffer;
}

export default function PDFDisplay({ data }: IProps) {
  const { viewerRef, usePDFSlickStore, PDFSlickViewer } = usePDFSlick(data, {
    scaleValue: 'page-fit',
    singlePageViewer: true,
  });

  return (
    <div className="absolute inset-0 bg-gray-300 pdfSlick rounded-md overflow-hidden border border-gray-200">
      <div className="flex-1 relative h-full">
        <PDFSlickViewer {...{ viewerRef, usePDFSlickStore }} />
        <PDFNavigation {...{ usePDFSlickStore }} />
      </div>
    </div>
  );
}

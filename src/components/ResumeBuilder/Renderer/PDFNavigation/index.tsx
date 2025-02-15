import type { TUsePDFSlickStore } from '@pdfslick/react';
import { cn } from '@/util/Cn';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

type PDFNavigationProps = {
  usePDFSlickStore: TUsePDFSlickStore;
};

export default function PDFNavigation({
  usePDFSlickStore,
}: PDFNavigationProps) {
  const pageNumber = usePDFSlickStore((s) => s.pageNumber);
  const numPages = usePDFSlickStore((s) => s.numPages);
  const pdfSlick = usePDFSlickStore((s) => s.pdfSlick);
  const scale = usePDFSlickStore((s) => s.scale);

  return (
    <div className="absolute w-full bottom-2 right-0 z-10 pointer-events-none">
      <div className="flex justify-center">
        <div
          className={cn(
            'inline-flex rounded justify-center border border-gray-200',
            'bg-white',
            'divide-x divide-gray-200',
          )}
        >
          <button
            disabled={pageNumber === 1}
            onClick={() => pdfSlick?.gotoPage(pageNumber - 1)}
            type="button"
            className="relative inline-flex items-center rounded-l px-2 py-2 text-gray-500 enabled:hover:text-gray-900  pointer-events-auto disabled:text-gray-200 cursor-pointer disabled:cursor-default w-10 h-10"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft
              className="h-full w-full"
              aria-hidden="true"
            />
          </button>
          <button
            disabled={!pdfSlick || scale <= 0.25}
            onClick={() => pdfSlick?.viewer?.decreaseScale()}
            type="button"
            className="relative inline-flex items-center px-2 py-2 text-gray-500 enabled:hover:text-gray-900  disabled:text-gray-200 pointer-events-auto cursor-pointer disabled:cursor-default w-10 h-10"
          >
            <span className="sr-only">Zoom Out</span>
            <ZoomOut
              className="h-full w-full"
              aria-hidden="true"
            />
          </button>
          <button
            disabled={!pdfSlick || scale >= 5}
            onClick={() => pdfSlick?.viewer?.increaseScale()}
            type="button"
            className="relative inline-flex items-center px-2 py-2 text-gray-500 enabled:hover:text-gray-900  pointer-events-auto disabled:text-gray-200 cursor-pointer disabled:cursor-default w-10 h-10"
          >
            <span className="sr-only">Zoom In</span>
            <ZoomIn
              className="h-full w-full"
              aria-hidden="true"
            />
          </button>
          <button
            disabled={numPages <= pageNumber}
            onClick={() => pdfSlick?.gotoPage(pageNumber + 1)}
            type="button"
            className="relative inline-flex items-center rounded-r px-2 py-2 text-gray-500 enabled:hover:text-gray-900  disabled:text-gray-200 pointer-events-auto cursor-pointer disabled:cursor-default w-10 h-10"
          >
            <span className="sr-only">Next</span>
            <ChevronRight
              className="h-full w-full"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

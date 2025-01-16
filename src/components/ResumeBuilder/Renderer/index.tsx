import { IResume } from '@/types/Resume';
import Stockholm from '@/components/ResumeBuilder/Renderer/Stockholm';
import { useRef } from 'react';
import Button from '@/components/Buttton';
import { jsPDF } from 'jspdf';

interface IProps {
  resume: IResume | null;
}

export default function Renderer({ resume }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  if (!resume) {
    return null;
  }

  function onClickCreatePDF() {
    if (ref.current) {
      const doc = new jsPDF();
      doc.html(ref.current, {
        callback: function (doc) {
          doc.save('output.pdf');
        },
        x: 0,
        y: 0,
        autoPaging: "text",
        fontFaces: [
          {
            family: "Nunito Sans",
            src: [
              {
                url: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
                format: 'truetype'
              }
            ]
            // src: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
          },
        ],
      });
    }
  }

  return (
    <div className="bg-gray-700 p-3">
      <div>
        <Button
          variant="blue"
          onClick={onClickCreatePDF}
        >
          Create PDF
        </Button>
      </div>
      <div
        ref={ref}
        className="bg-white p-6 mt-2"
      >
        <Stockholm resume={resume} />
      </div>
    </div>
  );
}

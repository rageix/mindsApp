import { useEffect, useState } from 'react';
import ResumeController from '@/components/ResumeBuilder/Builder/ResumeController';
import ColorPicker from '@/components/ResumeBuilder/Renderer/ColorPicker';
import FontPicker from '@/components/ResumeBuilder/Renderer/FontPicker';
import TemplatePicker from '@/components/ResumeBuilder/Renderer/TemplatePicker';
import '@pdfslick/react/dist/pdf_viewer.css';
import { getFile } from '@/util/Requests';
import unixTimestamp from '@/util/UnixTimestamp';
import PDFDisplay from '@/components/ResumeBuilder/Renderer/PDFDisplay';
import Button from '@/components/Buttton';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface IProps {
  controller: ResumeController;
  hasSubscription: boolean;
  isVisible: boolean;
}

export default function Renderer({
  controller,
  hasSubscription,
  isVisible,
}: IProps) {
  const [data, setData] = useState<ArrayBuffer>();
  const [time, setTime] = useState<string>('');
  const [showTemplates, setShowTemplates] = useState(false);

  // const resume = controller.state.current;
  const styleController = controller.state.styleController;
  styleController.useController();

  useEffect(() => {
    async function get() {
      const response = await getFile(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/resumes/render/${controller.state.original?._id}`,
      );
      if (response !== null) {
        setData(response);
        setTime(String(unixTimestamp()));
      }
    }

    get();
  }, [controller.state.lastSavedAt]);

  function onClickDownload() {
    if (data && hasSubscription) {
      const blob = new Blob([data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'resume.pdf';
      link.click();
    }
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="px-2 py-4 flex flex-col h-full w-full">
      <div className="flex items-end gap-x-2 justify-center">
        <ColorPicker
          controller={controller.state.primaryColorController}
          title="Primary Color"
        />
        {/*<ColorPicker*/}
        {/*  controller={controller.state.secondaryColorController}*/}
        {/*  title="Secondary Color"*/}
        {/*/>*/}
        <Button
          variant="blue"
          isInline
          onClick={() => setShowTemplates(!showTemplates)}
        >
          <span className="mr-1">
            {showTemplates ? 'Template' : 'Template'}
          </span>
          {showTemplates ? <ChevronDown /> : <ChevronUp />}
        </Button>
        <FontPicker controller={styleController} />
        <Button
          variant="blue"
          disabled={!hasSubscription}
          isInline
          onClick={onClickDownload}
        >
          Export
        </Button>
      </div>
      {showTemplates && (
        <div className="flex justify-center mt-3">
          <TemplatePicker controller={styleController} />
        </div>
      )}
      <div className="bg-white flex h-full flex-col">
        <div className="mt-3 flex h-full">
          <div className="w-full relative">
            {data && (
              <PDFDisplay
                key={String(time)}
                data={data}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useRef } from 'react';
import {
  PDFDownloadLink,
  PDFViewer,
  UsePDFInstance,
} from '@react-pdf/renderer';
import BirmanRight from '@/components/ResumeBuilder/Renderer/Templates/BirmanRight';
import ResumeController from '@/components/ResumeBuilder/Builder/ResumeController';
import Button from '@/components/Buttton';
import ColorPicker from '@/components/ResumeBuilder/Renderer/ColorPicker';
import FontPicker from '@/components/ResumeBuilder/Renderer/FontPicker';
import pdfFonts from '@/components/ResumeBuilder/Renderer/PDFFonts';
import TemplatePicker from '@/components/ResumeBuilder/Renderer/TemplatePicker';
import { ETemplate } from '@/types/Resume';
import BirmanLeft from '@/components/ResumeBuilder/Renderer/Templates/BirmanLeft';

interface IProps {
  controller: ResumeController;
  hasSubscription: boolean;
}

export default function Renderer({ controller, hasSubscription }: IProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const resume = controller.state.current;
  const styleController = controller.state.styleController;
  styleController.useController();

  const Doc = useMemo(() => {
    if (!resume) {
      return () => null;
    }

    const form = styleController.getForm();

    pdfFonts.load(form.fontFamily);
    if (form.titleFontFamily) {
      pdfFonts.load(form.titleFontFamily);
    }
    switch (styleController.form.template) {
      case ETemplate.BirmanRight:
        // eslint-disable-next-line react/display-name
        return () => (
          <BirmanRight
            resume={resume}
            style={form}
          />
        );
      case ETemplate.BirmanLeft:
        // eslint-disable-next-line react/display-name
        return () => (
          <BirmanLeft
            resume={resume}
            style={form}
          />
        );
    }
  }, [resume, styleController.form]);

  // useEffect(() => {
  //   // if (iframeRef.current?.contentDocument) {
  //   //   console.log('set it', iframeRef.current.contentDocument.oncontextmenu);
  //   //   iframeRef.current.contentDocument.oncontextmenu = () => {
  //   //     return false;
  //   //   };
  //   // }
  //
  //   const handleContextMenu = (event: any) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   };
  //
  //   if (iframeRef.current) {
  //     iframeRef.current.contentWindow?.addEventListener(
  //       'contextmenu',
  //       handleContextMenu,
  //     );
  //     iframeRef.current.addEventListener('click', handleContextMenu);
  //   }
  //
  //   return () => {
  //     if (iframeRef.current) {
  //       iframeRef.current.contentWindow?.removeEventListener(
  //         'contextmenu',
  //         handleContextMenu,
  //       );
  //
  //       iframeRef.current.removeEventListener('click', handleContextMenu);
  //     }
  //   };
  // }, [iframeRef.current]);

  return (
    <div className="px-2 py-4 flex flex-col h-full w-full">
      <div className="flex items-end gap-x-2 justify-end">
        <ColorPicker
          controller={controller.state.primaryColorController}
          title="Primary Color"
        />
        {/*<ColorPicker*/}
        {/*  controller={controller.state.secondaryColorController}*/}
        {/*  title="Secondary Color"*/}
        {/*/>*/}
        <FontPicker controller={styleController} />
        {hasSubscription ? (
          <PDFDownloadLink
            document={<Doc />}
            fileName="somename.pdf"
          >
            {/*// @ts-ignore*/}
            {({ loading }: UsePDFInstance) =>
              loading ? (
                <Button
                  variant="blue"
                  isInline
                >
                  Loading...
                </Button>
              ) : (
                <Button
                  variant="blue"
                  isInline
                >
                  Export PDF
                </Button>
              )
            }
          </PDFDownloadLink>
        ) : (
          <Button
            variant="blue"
            disabled={true}
            isInline
          >
            Export PDF
          </Button>
        )}
      </div>
      <div className="flex justify-center mt-3">
        <TemplatePicker controller={styleController} />
      </div>
      <div className="bg-white flex h-full flex-col">
        <div className="mt-3 border border-gray-200 flex h-full">
          <div
            className="w-full"
            onClick={() => alert('d2')}
            // onClick={(e) => {
            //   e.preventDefault();
            //   e.stopPropagation();
            // }}
            // onContextMenu={() => false}
          >
            <PDFViewer
              width="100%"
              height="100%"
              showToolbar={false}
              innerRef={iframeRef}
              // className="pointer-events-none"
              // style={{ overflow: 'hidden' }}
            >
              <Doc />
            </PDFViewer>
          </div>
        </div>
      </div>
    </div>
  );
}

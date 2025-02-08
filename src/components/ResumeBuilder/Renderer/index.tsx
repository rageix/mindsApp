import { useMemo } from 'react';
import { PDFDownloadLink, UsePDFInstance } from '@react-pdf/renderer';
import BirmanRight from '@/components/ResumeBuilder/Renderer/Templates/BirmanRight';
import ResumeController from '@/components/ResumeBuilder/Builder/ResumeController';
import Button from '@/components/Buttton';
import ColorPicker from '@/components/ResumeBuilder/Renderer/ColorPicker';
import FontPicker from '@/components/ResumeBuilder/Renderer/FontPicker';
import pdfFonts from '@/components/ResumeBuilder/Renderer/PDFFonts';
import TemplatePicker from '@/components/ResumeBuilder/Renderer/TemplatePicker';
import { EResumeFonts, ETemplate } from '@/types/Resume';
import BirmanLeft from '@/components/ResumeBuilder/Renderer/Templates/BirmanLeft';
import { usePDFSlick } from '@pdfslick/react';
import '@pdfslick/react/dist/pdf_viewer.css';
import PDFNavigation from './PDFNavigation';

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


  // const resume = controller.state.current;
  const styleController = controller.state.styleController;
  styleController.useController();

  const { viewerRef, usePDFSlickStore, PDFSlickViewer } = usePDFSlick(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/resumes/render/${controller.state.original?._id}`,
    {
      scaleValue: 'page-fit',
      singlePageViewer: true,
    },
  );

  // const Doc = useMemo(() => {
  //   if (!resume) {
  //     return () => null;
  //   }
  //
  //   const form = styleController.getForm();
  //   const demo = !hasSubscription;
  //
  //   if (demo) {
  //     pdfFonts.load(EResumeFonts.Merriweather);
  //   }
  //   pdfFonts.load(form.fontFamily);
  //   if (form.titleFontFamily) {
  //     pdfFonts.load(form.titleFontFamily);
  //   }
  //   switch (styleController.form.template) {
  //     case ETemplate.BirmanRight:
  //       // eslint-disable-next-line react/display-name
  //       return () => (
  //         <BirmanRight
  //           resume={resume}
  //           style={form}
  //           demo={demo}
  //         />
  //       );
  //     case ETemplate.BirmanLeft:
  //       // eslint-disable-next-line react/display-name
  //       return () => (
  //         <BirmanLeft
  //           resume={resume}
  //           style={form}
  //           demo={demo}
  //         />
  //       );
  //   }
  // }, [resume, styleController.form, hasSubscription]);

  // renderToBuffer(<Doc />).then((data) =>
  //   setPdf(data),
  // );

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

  if (!isVisible) {
    return null;
  }

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
        {/*{hasSubscription ? (*/}
        {/*  <PDFDownloadLink*/}
        {/*    document={<Doc />}*/}
        {/*    fileName="resume.pdf"*/}
        {/*  >*/}
        {/*    {({ loading }: UsePDFInstance) =>*/}
        {/*      loading ? (*/}
        {/*        <Button*/}
        {/*          variant="blue"*/}
        {/*          isInline*/}
        {/*        >*/}
        {/*          Loading...*/}
        {/*        </Button>*/}
        {/*      ) : (*/}
        {/*        <Button*/}
        {/*          variant="blue"*/}
        {/*          isInline*/}
        {/*        >*/}
        {/*          Export PDF*/}
        {/*        </Button>*/}
        {/*      )*/}
        {/*    }*/}
        {/*  </PDFDownloadLink>*/}
        {/*) : (*/}
        {/*  <Button*/}
        {/*    variant="blue"*/}
        {/*    disabled={true}*/}
        {/*    isInline*/}
        {/*  >*/}
        {/*    Export PDF*/}
        {/*  </Button>*/}
        {/*)}*/}
      </div>
      <div className="flex justify-center mt-3">
        <TemplatePicker controller={styleController} />
      </div>
      <div className="bg-white flex h-full flex-col">
        <div className="mt-3 border border-gray-200 flex h-full">
          <div className="w-full relative">
            <div className="absolute inset-0 bg-slate-200/70 pdfSlick">
              <div className="flex-1 relative h-full">
                <PDFSlickViewer {...{ viewerRef, usePDFSlickStore }} />
                <PDFNavigation {...{ usePDFSlickStore }} />
              </div>
            </div>
            {/*<Document*/}
            {/*  file={`${process.env.NEXT_PUBLIC_API_HOST}/api/resumes/render`}*/}
            {/*  className="w-full h-full"*/}
            {/*/>*/}
            {/*<PDFViewer*/}
            {/*  width="100%"*/}
            {/*  height="100%"*/}
            {/*  showToolbar={false}*/}
            {/*  innerRef={iframeRef}*/}
            {/*>*/}
            {/*  <Doc />*/}
            {/*</PDFViewer>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

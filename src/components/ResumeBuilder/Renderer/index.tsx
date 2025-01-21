import { useMemo } from 'react';
// import { jsPDF } from 'jspdf';
import {
  PDFDownloadLink,
  PDFViewer,
  UsePDFInstance,
} from '@react-pdf/renderer';
import StockholmPDF from '@/components/ResumeBuilder/Renderer/StockholmPDF';
import ResumeController from '@/components/ResumeBuilder/Builder/ResumeController';
import LineHeightPicker from '@/components/ResumeBuilder/Renderer/LineHeightPicker';
import FontSizePicker from '@/components/ResumeBuilder/Renderer/FontSizePicker';
import Button from '@/components/Buttton';
import ColorPicker from '@/components/ResumeBuilder/Renderer/ColorPicker';

interface IProps {
  // resume: IResume | null;
  controller: ResumeController;
}

export default function Renderer({ controller }: IProps) {
  // const ref = useRef<HTMLDivElement>(null);
  //
  // if (!resume) {
  //   return null;
  // }
  //
  // function onClickCreatePDF() {
  //   if (ref.current) {

  //       const styles = StyleSheet.create({
  //         page: {
  //           flexDirection: 'row',
  //           backgroundColor: '#E4E4E4'
  //         },
  //         section: {
  //           margin: 10,
  //           padding: 10,
  //           flexGrow: 1
  //         }
  //       });
  //
  // // Create Document Component
  //       const MyDocument = () => (
  //         <Document>
  //           <Page size="A4" style={styles.page}>
  //             <View style={styles.section}>
  //               <Text>Section #1</Text>
  //             </View>
  //             <View style={styles.section}>
  //               <Text>Section #2</Text>
  //             </View>
  //           </Page>
  //         </Document>
  //       );

  // const stream = ReactPDF.renderToStream(<MyDocument />);

  // const doc = new jsPDF();
  // doc.html(ref.current, {
  //   callback: function (doc) {
  //     doc.save('output.pdf');
  //   },
  //   x: 0,
  //   y: 0,
  //   autoPaging: "text",
  //   fontFaces: [
  //     {
  //       family: "Nunito Sans",
  //       src: [
  //         {
  //           url: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
  //           format: 'truetype'
  //         }
  //       ]
  //       // src: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
  //     },
  //   ],
  // });
  //   }
  // }

  //   const styles = StyleSheet.create({
  //     page: {
  //       flexDirection: 'row',
  //       backgroundColor: '#E4E4E4'
  //     },
  //     section: {
  //       margin: 10,
  //       padding: 10,
  //       flexGrow: 1
  //     }
  //   });
  //
  // // Create Document Component
  //   const MyDocument = () => (
  //     <Document>
  //       <Page size="A4" style={styles.page}>
  //         <View style={styles.section}>
  //           <Text>Section #1</Text>
  //         </View>
  //         <View style={styles.section}>
  //           <Text>Section #2</Text>
  //         </View>
  //       </Page>
  //     </Document>
  //   );

  const resume = controller.state.current;
  const styleController = controller.state.styleController;
  styleController.useController();

  const Doc = useMemo(
    () => (resume ? () => <StockholmPDF resume={resume} /> : () => null),
    [resume],
  );

  return (
    <div className="px-2 py-4 h-full absolute w-full">
      <div className="flex items-end gap-x-2 justify-end">
        <ColorPicker
          value={styleController.form.primaryColor}
          onChange={styleController.onChangePrimaryColor}
        />
        <FontSizePicker
          value={styleController.form.fontSize}
          onChange={styleController.onChangeFontSize}
        />
        <LineHeightPicker
          value={styleController.form.lineHeight}
          onChange={styleController.onChangeLineHeight}
        />
        <PDFDownloadLink
          document={<Doc />}
          fileName="somename.pdf"
        >
          {/*// @ts-ignore*/}
          {({ loading }: UsePDFInstance) =>
            loading ? (
              <Button variant="blue">Loading...</Button>
            ) : (
              <Button variant="blue">Download PDF</Button>
            )
          }
        </PDFDownloadLink>
        {/*<Button*/}
        {/*  variant="blue"*/}
        {/*  onClick={onClickCreatePDF}*/}
        {/*>*/}
        {/*  Create PDF*/}
        {/*</Button>*/}
      </div>
      <div
        // ref={ref}
        className="bg-white border rounded-md p-6 mt-2 h-full"
      >
        <PDFViewer
          width="100%"
          height="100%"
          showToolbar={false}
        >
          <Doc />
        </PDFViewer>
      </div>
    </div>
  );
}

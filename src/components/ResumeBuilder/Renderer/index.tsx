import { IResume } from '@/types/Resume';
import Stockholm from '@/components/ResumeBuilder/Renderer/Stockholm';
import { useMemo } from 'react';
// import { jsPDF } from 'jspdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StockholmPDF from '@/components/ResumeBuilder/Renderer/StockholmPDF';

interface IProps {
  resume: IResume | null;
}

export default function Renderer({ resume }: IProps) {
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

  const Doc = useMemo(
    () => (resume ? () => <StockholmPDF resume={resume} /> : () => null),
    [resume],
  );

  return (
    <div className="bg-gray-700 p-3">
      <div>
        <PDFDownloadLink
          document={<Doc />}
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
        {/*<Button*/}
        {/*  variant="blue"*/}
        {/*  onClick={onClickCreatePDF}*/}
        {/*>*/}
        {/*  Create PDF*/}
        {/*</Button>*/}
      </div>
      {/*<div*/}
      {/*  // ref={ref}*/}
      {/*  className="bg-white p-6 mt-2"*/}
      {/*>*/}
      {/*  <Stockholm resume={resume} />*/}
      {/*</div>*/}
    </div>
  );
}

import { Link, Text, View } from '@react-pdf/renderer';
import { EResumeFonts } from '@/types/Resume';

// interface IProps {
// }

export default function Watermark() {
  return (
    <>
      <View
        fixed
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: EResumeFonts.Merriweather,
        }}
      >
        <Text style={{ fontSize: 100, fontWeight: 'bold', color: '#e5e7eb' }}>
          HOBORT
        </Text>
        <Text style={{ fontSize: 100, fontWeight: 'bold', color: '#e5e7eb' }}>
          DEMO
        </Text>
      </View>
      <View
        fixed
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          zIndex: 101,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          fontFamily: EResumeFonts.Merriweather,
        }}
      >
        <Text style={{ fontSize: 12, color: '#9ca3af', paddingVertical: 12 }}>
          Hobort Resume Builder - To remove watermarks please subscribe. -{' '}
          <Link href="https://www.hobort.com" style={{color: '#9ca3af'}}>hobort.com</Link>
        </Text>
      </View>
    </>
  );
}

import { IRBStyle, IResume } from '@/types/Resume';
import MainBody from '@/components/ResumeBuilder/Renderer/Templates/Birman/Sections/MainBody';
import HeaderDetails from '@/components/ResumeBuilder/Renderer/Templates/Birman/Sections/HeaderDetails';
import { View } from '@react-pdf/renderer';
import SideColumn from '@/components/ResumeBuilder/Renderer/Templates/Birman/Sections/SideColumn';
import { styles } from '@/components/ResumeBuilder/Renderer/Templates/Birman/styles';
import Birman from '@/components/ResumeBuilder/Renderer/Templates/Birman';

interface IProps {
  resume: IResume;
  style: IRBStyle;
  demo: boolean;
}

export default function BirmanRight({ resume, style, demo }: IProps) {
  return (
    <Birman
      style={style}
      demo={demo}
    >
      <View style={[styles.section, styles.header]}>
        <HeaderDetails sections={resume.sections} />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={[styles.section, { width: '60%' }]}>
          <MainBody sections={resume.sections} />
        </View>
        <View style={[styles.section, { width: '40%' }]}>
          <SideColumn sections={resume.sections} />
        </View>
      </View>
    </Birman>
  );
}

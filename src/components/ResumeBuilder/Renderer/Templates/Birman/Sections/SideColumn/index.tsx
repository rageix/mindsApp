import { ERBType, IRBSection } from '@/types/Resume';
import { StyleSheet, View } from '@react-pdf/renderer';
import Links from '@/components/ResumeBuilder/Renderer/Templates/Birman/Sections/Links';
import Languages from '@/components/ResumeBuilder/Renderer/Templates/Birman/Sections/Languages';
import Skills from '@/components/ResumeBuilder/Renderer/Templates/Birman/Sections/Skills';
import Details from '@/components/ResumeBuilder/Renderer/Templates/Birman/Sections/Details';
import { calcStyles } from '@/util/CalcStyles';
import { useContext } from 'react';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});

interface IProps {
  sections: IRBSection[];
}

export default function SideColumn({ sections }: IProps) {
  const styleContext = useContext(StyleContext);

  return (
    <View
      // debug
      style={calcStyles(styles.container, styleContext)}
    >
      {sections.map((v, i) => {
        switch (v.type) {
          case ERBType.Detail:
            return (
              <Details
                key={i}
                section={v}
              />
            );
          case ERBType.Link:
            return (
              <Links
                key={i}
                section={v}
              />
            );
          case ERBType.Language:
            return (
              <Languages
                key={i}
                section={v}
              />
            );
          case ERBType.Skill:
            return (
              <Skills
                key={i}
                section={v}
              />
            );

          default:
            return null;
        }
      })}
    </View>
  );
}

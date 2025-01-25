import { ERBType, IRBDetail, IRBSection } from '@/types/Resume';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import TemplateImage from '@/components/ResumeBuilder/Renderer/TemplateImage';
import StyleContext from '@/components/ResumeBuilder/Renderer/styleContext';
import { useContext } from 'react';
import { calcStyles } from '@/util/CalcStyles';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  imgWrapper: {
    width: 75,
    borderRadius: '100%',
    overflow: 'hidden',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});

interface IProps {
  sections: IRBSection[];
}

export default function HeaderDetails({ sections }: IProps) {
  const styleContext = useContext(StyleContext);
  const section = sections.find((v) => v.type === ERBType.Detail);

  if (!section) {
    return null;
  }

  const data = section.data[0] as IRBDetail;

  if (!data) {
    return null;
  }

  return (
    <View style={calcStyles(styles.wrapper, styleContext)}>
      {data.photo && (
        <View style={calcStyles(styles.imgWrapper, styleContext)}>
          <TemplateImage id={data.photo} />
        </View>
      )}
      <View>
        <View>
          <Text
            style={[
              calcStyles(styles.name, styleContext),
              {
                fontFamily: styleContext.titleFontFamily
                  ? styleContext.titleFontFamily
                  : undefined,
              },
            ]}
          >
            {data.firstName} {data.lastName}
          </Text>
        </View>
        <View>
          <Text style={calcStyles(styles.title, styleContext)}>
            {data.title}
          </Text>
        </View>
      </View>
    </View>
  );
}

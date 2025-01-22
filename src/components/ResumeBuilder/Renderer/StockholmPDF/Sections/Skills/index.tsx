import { ERBSkillLevel, IRBSection, IRBSkill } from '@/types/Resume';
import SectionTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SectionTitle';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { ISelectOption } from '@/types/SelectOption';

const OPTIONS: ISelectOption<ERBSkillLevel | null>[] = [
  {
    key: String(ERBSkillLevel.Novice),
    value: ERBSkillLevel.Novice,
    label: 'Novice',
  },
  {
    key: String(ERBSkillLevel.Beginner),
    value: ERBSkillLevel.Beginner,
    label: 'Beginner',
  },
  {
    key: String(ERBSkillLevel.Skillfull),
    value: ERBSkillLevel.Skillfull,
    label: 'Skillfull',
  },
  {
    key: String(ERBSkillLevel.Experienced),
    value: ERBSkillLevel.Experienced,
    label: 'Experienced',
  },
  {
    key: String(ERBSkillLevel.Expert),
    value: ERBSkillLevel.Expert,
    label: 'Expert',
  },
];

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface IProps {
  section: IRBSection;
  fontScale: number;
}

export default function Skills({ section, fontScale }: IProps) {
  return (
    <View style={styles.container}>
      <SectionTitle fontScale={fontScale}>{section.title}</SectionTitle>
      <View>
        {section.data.map((v, i) => {
          const item = v as IRBSkill;
          const option = OPTIONS.find((v) => v.value === item.level);

          return (
            <View key={i}>
              <Text>
                {item.skill}
                {option && <Text> - {option.label}</Text>}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

import { ERBType, IRBDetail, IRBSection } from '@/types/Resume';
import { StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  name: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'normal',
  },
});

interface IProps {
  sections: IRBSection[];
}

export default function HeaderDetails({ sections }: IProps) {
  const section = sections.find((v) => v.type === ERBType.Detail);

  if (!section) {
    return null;
  }

  const data = section.data[0] as IRBDetail;

  if (!data) {
    return null;
  }

  return (
    <>
      <Text style={styles.name}>
        {data.firstName} {data.lastName}
      </Text>
      <Text style={styles.title}>{data.title}</Text>
    </>
  );
}

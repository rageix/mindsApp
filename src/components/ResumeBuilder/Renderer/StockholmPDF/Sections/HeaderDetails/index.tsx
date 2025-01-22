import { ERBType, IRBDetail, IRBSection } from '@/types/Resume';
import { StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  name: {
    // fontFamily: 'Courier',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});

interface IProps {
  sections: IRBSection[];
  fontScale: number;
}

export default function HeaderDetails({ sections, fontScale }: IProps) {
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
      <Text
        style={[styles.name, { fontSize: styles.name.fontSize * fontScale }]}
      >
        {data.firstName} {data.lastName}
      </Text>
      <Text
        style={[styles.title, { fontSize: styles.title.fontSize * fontScale }]}
      >
        {data.title}
      </Text>
    </>
  );
}

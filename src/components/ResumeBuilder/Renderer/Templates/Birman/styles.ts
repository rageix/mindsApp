import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: '.5in',
  },
  section: {
    padding: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
  mainBody: {
    display: 'flex',
    flexDirection: 'column',
    columnGap: 10,
    rowGap: 10,
    flex: 1,
  },
  header: {},
});
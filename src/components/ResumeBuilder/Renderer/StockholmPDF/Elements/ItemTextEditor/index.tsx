import { createHeadlessEditor } from '@lexical/headless';
import { $getRoot, ParagraphNode, TextNode } from 'lexical';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  text: {
    color: '#111827',
    fontSize: 16,
  },
});

interface IProps {
  value: string;
}

export default function ItemTextEditor({ value }: IProps) {
  const config = {
    namespace: 'textEditor',
    nodes: [ParagraphNode, TextNode, ListItemNode, ListNode, LinkNode],
    onError(error: Error) {
      throw error;
    },
  };
  const editor = createHeadlessEditor(config);
  if (value) {
    editor.setEditorState(editor.parseEditorState(value));
  }
  // editor.update(() => {
  //   setHtml($generateHtmlFromNodes(editor));
  // });
  const editorStateTextString = editor.read(() => $getRoot().getTextContent());

  return (
    <View>
      <Text style={styles.text}>{editorStateTextString}</Text>
    </View>
  );
}

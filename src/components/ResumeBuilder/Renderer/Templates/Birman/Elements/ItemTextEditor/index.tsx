import { createHeadlessEditor } from '@lexical/headless';
import { ParagraphNode, TextNode } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { StyleSheet, View } from '@react-pdf/renderer';
import Html, { HtmlStyles } from 'react-pdf-html';
import sanitizeHtml from 'sanitize-html';
import { useContext } from 'react';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';
import { calcStyles } from '@/util/CalcStyles';

const stylesheet: HtmlStyles | HtmlStyles[] | undefined = {
  p: {
    marginTop: 2,
    marginRight: 0,
    marginBottom: 2,
    marginLeft: 0,
  },
  ol: {
    marginTop: 2,
    marginRight: 0,
    marginBottom: 2,
    marginLeft: 0,
  },
  ul: {
    marginTop: 2,
    marginRight: 0,
    marginBottom: 2,
    marginLeft: 0,
  },
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  },
  p: {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  ol: {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  li: {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
  },
});

interface IProps {
  value: string;
}

export default function ItemTextEditor({ value }: IProps) {
  const styleContext = useContext(StyleContext);

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

  const editorHTMLString = sanitizeHtml(
    editor.read(() => $generateHtmlFromNodes(editor)),
  );

  return (
    <View>
      <Html
        style={calcStyles(styles.text, styleContext)}
        stylesheet={stylesheet}
      >
        {editorHTMLString}
      </Html>
    </View>
  );
}

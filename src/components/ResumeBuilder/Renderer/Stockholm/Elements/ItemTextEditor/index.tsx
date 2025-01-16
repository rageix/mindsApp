import { useEffect, useState } from 'react';
import { createHeadlessEditor } from '@lexical/headless';
import { $generateHtmlFromNodes } from '@lexical/html';
import { ParagraphNode, TextNode } from 'lexical';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';

interface IProps {
  value: string;
}

export default function ItemTextEditor({ value }: IProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    console.log('itemtexteditor', value);
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
    editor.update(() => {
      setHtml($generateHtmlFromNodes(editor));
    });
  }, [value]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

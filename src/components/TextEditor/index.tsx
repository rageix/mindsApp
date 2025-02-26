import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $isTextNode,
  DOMConversionMap,
  DOMExportOutput,
  DOMExportOutputMap,
  isHTMLElement,
  Klass,
  LexicalEditor,
  LexicalNode,
  ParagraphNode,
  TextNode,
} from 'lexical';

import ExampleTheme from './Theme';
import ToolbarPlugin from './ToolbarPlugin';
import { parseAllowedColor, parseAllowedFontSize } from './StyleConfig';
import './style.css';
import { useMemo } from 'react';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

const placeholder = 'Enter some text...';

const removeStylesExportDOM = (
  editor: LexicalEditor,
  target: LexicalNode,
): DOMExportOutput => {
  const output = target.exportDOM(editor);
  if (output && isHTMLElement(output.element)) {
    // Remove all inline styles and classes if the element is an HTMLElement
    // Children are checked as well since TextNode can be nested
    // in i, b, and strong tags.
    for (const el of [
      output.element,
      ...output.element.querySelectorAll('[style],[class],[dir="ltr"]'),
    ]) {
      el.removeAttribute('class');
      el.removeAttribute('style');
      if (el.getAttribute('dir') === 'ltr') {
        el.removeAttribute('dir');
      }
    }
  }
  return output;
};

const exportMap: DOMExportOutputMap = new Map<
  Klass<LexicalNode>,
  (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput
>([
  [ParagraphNode, removeStylesExportDOM],
  [TextNode, removeStylesExportDOM],
]);

const getExtraStyles = (element: HTMLElement): string => {
  // Parse styles from pasted input, but only if they match exactly the
  // sort of styles that would be produced by exportDOM
  let extraStyles = '';
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== '' && fontSize !== '15px') {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== '' && color !== 'rgb(0, 0, 0)') {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
};

const constructImportMap = (): DOMConversionMap => {
  const importMap: DOMConversionMap = {};

  // Wrap all TextNode importers with a function that also imports
  // the custom styles implemented by the playground
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }

  return importMap;
};

export const defaultEditorState = () => {
  const paragraph = $createParagraphNode();
  const text = $createTextNode('');
  paragraph.append(text);
  $getRoot().append(paragraph);
  // $getRoot().selectEnd();
};

interface IProps {
  initialState: string | null;
  onChange: (state: string) => void;
  onBlur?: () => void;
}

export default function TextEditor({ initialState, onChange, onBlur }: IProps) {
  const editorConfig: InitialConfigType = useMemo(
    () => ({
      html: {
        export: exportMap,
        import: constructImportMap(),
      },
      namespace: 'textEditor',
      nodes: [ParagraphNode, TextNode, ListItemNode, ListNode, LinkNode],
      onError(error: Error) {
        throw error;
      },
      theme: ExampleTheme,
      editorState: () =>
        $convertFromMarkdownString(
          initialState || '',
          TRANSFORMERS,
          undefined,
          true,
        ),
    }),
    [initialState],
  );

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="relative w-full">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input min-h-[10rem] resize-none text-base relative outline-0 px-4 py-2 [&>ul]:list-disc [&>ol]:list-decimal bg-gray-100 outline-0 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 rounded-bl-md rounded-br-md overflow-hidden shadow-none"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="text-gray-400 overflow-hidden absolute truncate inline-block pointer-events-none top-2 left-4 text-base">
                    {placeholder}
                  </div>
                }
                onBlur={onBlur}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/*<AutoFocusPlugin />*/}
          <ListPlugin />
          <LinkPlugin />
          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState) => {
              console.log('onchange');
              const markdown = editorState.read(() =>
                $convertToMarkdownString(TRANSFORMERS, undefined, true),
              );
              onChange(markdown);
              // onChange(JSON.stringify(editorState.toJSON()));
            }}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}

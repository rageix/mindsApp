/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';
import {
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalNode,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {
  $isListItemNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  insertList,
  ListNode,
} from '@lexical/list';
import { $setBlocksType } from '@lexical/selection';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from 'lucide-react';
import Button from '@/components/Buttton';
import { cn } from '@/util/Cn';
import { getSelectedNode } from '@/util/GetSelectedNode';
import {
  IS_ALIGN_CENTER,
  IS_ALIGN_LEFT,
  IS_ALIGN_RIGHT,
} from '@/common/Lexical';

const LowPriority = 1;
const BUTTON_CLASS_NAME =
  'hover:text-gray-500 focus-visible:outline-blue-600 !p-0 !shadow-none';
const ACTIVE_BUTTON_CLASS_NAME = '!text-blue-600  hover:!text-blue-500';
const DISABLED_BUTTON_CLASS_NAME = '!text-gray-200 hover:!text-gray-200';

// interface IProps {}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberList, setIsNumberList] = useState(false);
  const [textJustify, setTextJustify] = useState(0);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const linkNode = $isLinkNode(parent)
        ? parent
        : $isLinkNode(node)
          ? node
          : null;

      if (linkNode) {
        setIsLink(true);
        setLinkUrl(linkNode.__url);
      } else {
        setIsLink(false);
        setLinkUrl('');
      }

      const listItemNode = $isListItemNode(parent)
        ? parent
        : $isListItemNode(node)
          ? node
          : null;

      if (listItemNode) {
        const parentList = $getNearestNodeOfType<ListNode>(
          listItemNode,
          ListNode,
        );

        const type = parentList?.getListType();
        setIsBulletList(type === 'bullet');
        setIsNumberList(type === 'number');
      } else {
        setIsBulletList(false);
        setIsNumberList(false);
      }

      const matchingParent = $findMatchingParent(
        node,
        (parentNode: LexicalNode | null | undefined) =>
          $isElementNode(parentNode) && !parentNode.isInline(),
      );

      const format = $isElementNode(matchingParent)
        ? matchingParent.getFormat()
        : $isElementNode(node)
          ? node.getFormat()
          : parent?.getFormat() || IS_ALIGN_LEFT;

      console.log(format);

      setTextJustify(format);
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        INSERT_UNORDERED_LIST_COMMAND,
        () => {
          insertList(editor, 'bullet');
          return true;
        },
        LowPriority,
      ),
      editor.registerCommand(
        INSERT_ORDERED_LIST_COMMAND,
        () => {
          insertList(editor, 'number');
          return true;
        },
        LowPriority,
      ),
      editor.registerCommand(
        TOGGLE_LINK_COMMAND,
        () => {
          // setIsLink(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  return (
    <div
      className="flex align-middle border-b border-gray-200 divide-x divide-gray-200 divide-solid"
      ref={toolbarRef}
    >
      <div className="flex gap-x-4 px-4 py-2">
        <Button
          variant="custom"
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          className={cn(
            BUTTON_CLASS_NAME,
            canUndo ? null : DISABLED_BUTTON_CLASS_NAME,
          )}
          aria-label="Undo"
        >
          <Undo />
        </Button>
        <Button
          variant="custom"
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          className={cn(
            BUTTON_CLASS_NAME,
            canRedo ? null : DISABLED_BUTTON_CLASS_NAME,
          )}
          aria-label="Redo"
        >
          <Redo />
        </Button>
      </div>
      <div className="flex gap-x-4 px-4 py-2">
        <Button
          variant="custom"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
          // className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
          className={cn(
            BUTTON_CLASS_NAME,
            isBold ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Format Bold"
        >
          <Bold />
        </Button>
        <Button
          variant="custom"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          }}
          // className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
          className={cn(
            BUTTON_CLASS_NAME,
            isItalic ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Format Italics"
        >
          <Italic />
        </Button>
        <Button
          variant="custom"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          }}
          // className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
          className={cn(
            BUTTON_CLASS_NAME,
            isUnderline ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Format Underline"
        >
          <Underline />
        </Button>
        <Button
          variant="custom"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
          }}
          // className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
          className={cn(
            BUTTON_CLASS_NAME,
            isStrikethrough ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Format Strikethrough"
        >
          <Strikethrough />
        </Button>
      </div>
      <div className="flex gap-x-4 px-4 py-2">
        <Button
          variant="custom"
          onClick={() => {
            if (isBulletList) {
              formatParagraph();
              return;
            }
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }}
          // className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
          className={cn(
            BUTTON_CLASS_NAME,
            isBulletList ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Unordered List"
        >
          <List />
        </Button>
        <Button
          variant="custom"
          onClick={() => {
            if (isNumberList) {
              formatParagraph();
              return;
            }
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          }}
          // className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
          className={cn(
            BUTTON_CLASS_NAME,
            isNumberList ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Ordered List"
        >
          <ListOrdered />
        </Button>
        <Button
          variant="custom"
          onClick={() => {
            const url = prompt('Enter a url.', linkUrl);
            editor.dispatchCommand(
              TOGGLE_LINK_COMMAND,
              !url
                ? null
                : {
                    url,
                    target: '_blank',
                  },
            );
          }}
          // className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
          className={cn(
            BUTTON_CLASS_NAME,
            isLink ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Link"
        >
          <LinkIcon />
        </Button>
      </div>
      <div className="flex gap-x-4 px-4 py-2">
        <Button
          variant="custom"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
          }}
          // className="toolbar-item spaced"
          className={cn(
            BUTTON_CLASS_NAME,
            textJustify === IS_ALIGN_LEFT ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Left Align"
        >
          <AlignLeft />
        </Button>
        <Button
          variant="custom"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
          }}
          // className="toolbar-item spaced"
          className={cn(
            BUTTON_CLASS_NAME,
            textJustify === IS_ALIGN_CENTER ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Center Align"
        >
          <AlignCenter />
        </Button>
        <Button
          variant="custom"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
          }}
          // className="toolbar-item spaced"
          className={cn(
            BUTTON_CLASS_NAME,
            textJustify === IS_ALIGN_RIGHT ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Right Align"
        >
          <AlignRight />
        </Button>
      </div>
    </div>
  );
}

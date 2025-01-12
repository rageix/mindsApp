/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  $isNodeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  insertList,
} from '@lexical/list';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlignCenter,
  AlignJustify,
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

const LowPriority = 1;
const BUTTON_CLASS_NAME =
  'hover:text-gray-500 focus-visible:outline-blue-600 !p-0 !shadow-none';
const ACTIVE_BUTTON_CLASS_NAME = '!text-blue-600  hover:!text-blue-500';
const DISABLED_BUTTON_CLASS_NAME = '!text-gray-200 hover:!text-gray-200';

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

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
    console.log('$isNodeSelection', $isNodeSelection(selection));
    const nodes = selection?.getNodes();
    console.log(nodes);
    for(const node of nodes || [])
      if($isLinkNode(node)) {
        setIsLink(true);
        console.log(node);
      }
    // $get
    // if($isElementNode(selection)){}
    // if($isLinkNode(selection)) {
    //
    // }
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
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }}
          // className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
          className={cn(
            BUTTON_CLASS_NAME,
            // isBold ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Unordered List"
        >
          <List />
        </Button>
        <Button
          variant="custom"
          onClick={() => {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          }}
          // className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
          className={cn(
            BUTTON_CLASS_NAME,
            // isItalic ? ACTIVE_BUTTON_CLASS_NAME : null,
          )}
          aria-label="Ordered List"
        >
          <ListOrdered />
        </Button>
        <Button
          variant="custom"
          onClick={() => {
            const url = prompt("Enter a url.");
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, !url ? null : {
              url,
              target: "_blank"
            });
          }}
          // className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
          className={cn(
            BUTTON_CLASS_NAME,
            // isItalic ? ACTIVE_BUTTON_CLASS_NAME : null,
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
          className={BUTTON_CLASS_NAME}
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
          className={BUTTON_CLASS_NAME}
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
          className={BUTTON_CLASS_NAME}
          aria-label="Right Align"
        >
          <AlignRight />
        </Button>
        <Button
          variant="custom"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
          }}
          // className="toolbar-item"
          className={BUTTON_CLASS_NAME}
          aria-label="Justify Align"
        >
          <AlignJustify />
        </Button>
      </div>
    </div>
  );
}

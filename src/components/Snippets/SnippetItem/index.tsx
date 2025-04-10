import SnippetInputController from '@/components/Snippets/SnippetItem/SnippetInputController';
import SnippetsController from '@/components/Snippets/SnippetsController';
import { cn } from '@/util/Cn';
import EllipsisMenu from '@/components/EllipsisMenu';
import MenuItemButton from '@/components/MenuItemButton';

interface IProps {
  controller: SnippetInputController;
  parentController: SnippetsController;
  isActive: boolean;
}

export function SnippetItem({
  controller,
  parentController,
  isActive,
}: IProps) {
  controller.useController();

  const { form } = controller;

  return (
    <div
      className={cn(
        'rounded-md border border-gray-200 overflow-hidden p-3 relative pr-14',
        isActive ? 'bg-gray-200' : null,
      )}
    >
      {!isActive && (
        <div className="isolate absolute top-2 right-2 z-50" onClick={() => console.log('clicked')}>
          <EllipsisMenu className="!w-36">
            <MenuItemButton
              onClick={() => parentController.onRemove(controller.id)}
            >
              Delete
            </MenuItemButton>
          </EllipsisMenu>
        </div>
      )}
      <div
        className={cn(isActive ? 'text-transparent h-14 overflow-clip' : null)}
      >
        {form.text}
      </div>
    </div>
  );
}

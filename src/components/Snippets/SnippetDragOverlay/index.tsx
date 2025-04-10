import SnippetInputController from '@/components/Snippets/SnippetItem/SnippetInputController';

interface IProps {
  controller: SnippetInputController;
}

export function SnippetDragOverlay({ controller }: IProps) {
  controller.useController();

  const { form } = controller;

  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden p-3">
      <div className="h-14 overflow-hidden">{form.text}</div>
    </div>
  );
}

import SnippetsController from '@/components/Snippets/SnippetsController';
import { SnippetBoard } from '@/components/Snippets/SnippetBoard';

interface IProps {
  controller: SnippetsController;
}

export default function Snippets({ controller }: IProps) {
  controller.useController();
  const { controllers } = controller.state;

  if (controllers.length === 0) {
    return (
      <div className="text text-gray-700">
        Select some text to add snippets.
      </div>
    );
  }

  return (
    <div className='h-full'>
      <SnippetBoard controller={controller} />
    </div>
  );
}

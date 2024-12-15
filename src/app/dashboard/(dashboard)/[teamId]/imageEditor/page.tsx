import DashboardPageHeader from '@/components/DashboardPageHeader';
import ImageEditorView from '@/components/ImageEditorView';

export default function Page() {
  return (
    <>
      <DashboardPageHeader title="Image Editor" />
      <ImageEditorView />
    </>
  );
}

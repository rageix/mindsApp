import Modal from '@/components/Modal';
import ImageUploader from '@/components/ImageUploader';
import { MongoId } from '@/types/MongoDocument';

interface IProps {
  open: boolean;
  onClose: () => void;
  onUpload: (ids?: MongoId[]) => void;
  route: string;
  maxFileSize: number;
  maxFiles?: number;
}

export default function ImageUploadModal({
  open,
  onClose,
  onUpload,
  route,
  maxFileSize,
  maxFiles
}: IProps) {
  return (
    <Modal
      title="Upload Image"
      open={open}
      onClose={onClose}
      size="lg"
    >
      <div className="flex flex-col gap-y-2">
      <ImageUploader
        onUpload={onUpload}
        route={route}
        maxFileSize={maxFileSize}
        maxFiles={maxFiles}
      />
      </div>
    </Modal>
  );
}

import { IFile } from '@/types/File';
import ProtectedImage from '@/components/ProtectedImage';
import { IHasId } from '@/types/HasId';
import Button from '@/components/Buttton';
import { DownloadIcon, PencilIcon } from 'lucide-react';
import downloadFile from '@/util/DownloadFile';

interface IProps {
  file: IHasId<IFile>;
}

export default function FilesViewItem({ file }: IProps) {
  return (
    <div>
      <div className="relative">
        <div className="relative w-full overflow-hidden rounded-lg">
          <ProtectedImage
            _id={file._id}
            alt="Generated Image"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <div className="flex justify-between space-x-3 mt-3">
          <Button variant="blue">
            <PencilIcon />
          </Button>
          <Button
            variant="blue"
            onClick={async () => await downloadFile(file._id)}
          >
            <DownloadIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

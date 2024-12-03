import FieldController from '@/components/PublicFormView/PublicFormEditor/Field/FieldController';
import FileUploader from '@/components/FileUploader';
import { useParams } from 'next/navigation';
import { FileIcon } from 'lucide-react';
import Button from '@/components/Buttton';

interface IProps {
  controller: FieldController;
}

export default function FieldFile({ controller }: IProps) {
  const { formId } = useParams<{ formId: string }>();
  // controller.useController();

  return (
    <div>
      <FileUploader
        maxFiles={1}
        route={`/api/forms/file/${formId}`}
        maxFileSize={5000000}
        params={{ formId }}
        onUpload={controller.onUploadFile}
      />
      <ul
        role="list"
        className="divide-y divide-gray-100"
      >
        {(controller.form.values || []).map((v, i) => (
          <li
            key={v.key || v.value}
            className="py-4"
          >
            <div className="flex items-center gap-x-3 px-6 py-4 rounded-md bg-gray-700">
              <div>
                <FileIcon />
              </div>
              <div className="ms-3 grow">
                {v.label}
              </div>
              <div>
                <Button
                  variant="red"
                  isInline
                  onClick={() => controller.onClickRemoveFile(i)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

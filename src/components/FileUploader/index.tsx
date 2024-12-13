import { useDropzone } from 'react-dropzone';
import { cn } from '@/util/Cn';
import { postForm } from '@/util/Requests';
import { FileIcon } from 'lucide-react';
import { useState } from 'react';
import Loading from '@/components/Loading';
import { IFileUpload, IFileUploadResponse } from '@/types/FileUpload';
import useTheme from '@/hooks/UseTheme';
import { ETheme } from '@/common/Theme';

export async function uploadFiles(
  route: string,
  data: FormData,
): Promise<IFileUploadResponse | undefined> {
  const response = await postForm<IFileUploadResponse>(
    process.env.NEXT_PUBLIC_API_HOST + route,
    data,
  );

  if (response) {
    return response;
  }
}

interface Props {
  onUpload: (files: IFileUpload[]) => void;
  route: string;
  params?: Record<string, string>;
  maxFiles?: number;
  maxFileSize?: number;
}

export default function FileUploader({
  onUpload,
  route,
  params,
  maxFiles = 1,
  maxFileSize,
}: Props) {
  const theme = useTheme();

  async function onDrop(acceptedFiles: File[]) {
    if (acceptedFiles.length === 0) {
      alert('Nothing selected. No files will be uploaded!');
      return;
    }

    if (maxFiles && acceptedFiles.length > maxFiles) {
      alert(
        `You can only upload ${maxFiles} file${
          maxFiles > 1 ? 's' : ''
        } at a time.`,
      );
      return;
    }

    let files: IFileUpload[] = [];

    for (let i = 0, len = acceptedFiles.length; i < len; i++) {
      if (maxFileSize && acceptedFiles[i].size > maxFileSize) {
        alert(`File is too large. Max file size is: ${maxFileSize} bytes.`);
        return;
      }

      const data = new FormData();

      for (const [key, value] of Object.entries(params || {})) {
        data.append(key, value);
      }

      data.append('file', acceptedFiles[i]);
      setLoading(true);
      const response = await uploadFiles(route, data);
      files = files.concat(response?.files || []);
    }

    setLoading(false);
    onUpload(files);
  }

  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div
      className={cn(
        'p-10 rounded-lg flex justify-center items-center cursor-pointer',
        theme === ETheme.light ? 'bg-gray-200 hover:bg-gray-100' : null,
        theme === ETheme.dark ? 'bg-gray-900 hover:bg-gray-700' : null,
      )}
      {...getRootProps()}
    >
      <input
        className="hidden"
        {...getInputProps()}
      />

      {loading && <Loading size="lg" />}
      {!loading && (
        <div className="flex flex-col space-y-6 text-center">
          <div className="flex justify-center items-center">
            <div
              className={cn(
                'size-12',
                theme === ETheme.light ? 'text-gray-900' : null,
                theme === ETheme.dark ? 'text-gray-400' : null,
              )}
            >
              <FileIcon className="w-full h-full" />
            </div>
          </div>
          <div>
            <div
              className={cn(
                'text-sm leading-6',
                theme === ETheme.light ? 'text-gray-900' : null,
                theme === ETheme.dark ? 'text-white' : null,
              )}
            >
              <span>Drag &apos;n&apos; drop some files here</span> or click to
              select files.
            </div>
            <div
              className={cn(
                theme === ETheme.light ? 'text-gray-500' : null,
                theme === ETheme.dark ? 'text-gray-400' : null,
              )}
            >
              <div className="text-sm leading-6">Maximum file size is 5 MB</div>
              {maxFiles && (
                <div className="text-sm leading-6">
                  Maximum number of files: {maxFiles}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

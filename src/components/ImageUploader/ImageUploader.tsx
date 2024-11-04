'use client';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/util/Cn';
import { postForm } from '@/util/Requests';
import { ImageUpIcon } from 'lucide-react';
import { useState } from 'react';
import Loading from '@/components/Loading';
import { MongoId } from '@/types/MongoDocument';
import { IdsResponse } from '@/types/IdsResponse';

export async function uploadFiles(
  route: string,
  data: FormData,
): Promise<IdsResponse | undefined> {
  const response = await postForm<IdsResponse>(
    process.env.NEXT_PUBLIC_API_HOST + route,
    data,
  );

  if (response) {
    return response;
  }
}

interface Props {
  onUpload: (ids?: MongoId[]) => void;
  route: string;
  params?: Record<string, string>;
  maxFiles?: number;
  maxFileSize?: number;
}

export default function ImageUploader({
  onUpload,
  route,
  params,
  maxFiles = 1,
  maxFileSize,
}: Props) {
  async function onDrop(acceptedFiles: File[]) {
    if (acceptedFiles.length === 0) {
      alert(
        'No files will be uploaded! Please only select PNG, JPEG, or WEBP files.',
      );
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

    let ids: MongoId[] = [];

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
      ids = ids.concat(response?.ids || []);
    }

    setLoading(false);
    onUpload(ids);
  }

  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/tiff': [],
    },
  });

  return (
    <div
      className={cn(
        'p-10 rounded-lg flex justify-center items-center bg-gray-900 shadow hover:shadow-none hover:bg-gray-700 cursor-pointer',
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
            <div className="w-12 h-12 text-gray-400">
              <ImageUpIcon className="w-full h-full" />
            </div>
          </div>
          <div>
            <div className="text-sm leading-6 text-gray-400">
              <span className="text-white">
                Drag &apos;n&apos; drop some files here
              </span>{' '}
              or click to select files.
            </div>
            <div className="text-sm leading-6 text-gray-400">
              PNG, JPG, WEBP, TIFF up to 2MB
            </div>
            {maxFiles && (
              <div className="text-sm leading-6 text-gray-400">
                Maximum number of files: {maxFiles}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

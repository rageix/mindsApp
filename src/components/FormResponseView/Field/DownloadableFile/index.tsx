'use client';
import { useState } from 'react';
import Button from '@/components/Buttton';
import Loading from '@/components/Loading';
import { DownloadCloud, FileIcon } from 'lucide-react';
import downloadFile from "@/util/DownloadFile";
import { IResponseValue } from "@/types/FormPublicRequest";

interface IProps {
  value: IResponseValue;
}

export default function DownloadableFile({ value }: IProps) {
  const [loading, setLoading] = useState(false);

  async function onClickLoad () {
    setLoading(true);
    await downloadFile(String(value.value));
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-x-3 border-gray-500 border-b-2 py-3">
      <div className="shrink-0">
        <FileIcon/>
      </div>
      <div className="grow truncate">{value.label}</div>
      <div className="shrink-0">
        <Button variant="blue" onClick={onClickLoad}>
          {loading ? <Loading size="sm" /> : <DownloadCloud />}
        </Button>
      </div>
    </div>
  );
}

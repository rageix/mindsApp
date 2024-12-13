'use client';
import { useState } from 'react';
import Button from '@/components/Buttton';
import Loading from '@/components/Loading';
import { DownloadCloud, FileIcon } from 'lucide-react';
import downloadFile from "@/util/DownloadFile";
import { IResponseValue } from "@/types/FormPublicRequest";
import useTheme from "@/hooks/UseTheme";
import { cn } from "@/util/Cn";
import { ETheme } from "@/common/Theme";

interface IProps {
  value: IResponseValue;
}

export default function DownloadableFile({ value }: IProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  async function onClickLoad () {
    setLoading(true);
    await downloadFile(String(value.value));
    setLoading(false);
  }

  return (
    <div className={cn("flex items-center gap-x-3 border-b py-3",
        theme === ETheme.light ? 'border-gray-200' : null,
        theme === ETheme.dark ? 'border-gray-500' : null,
        )}>
      <div className={cn("shrink-0",
        theme === ETheme.light ? 'text-gray-500' : null,
        theme === ETheme.dark ? 'text-gray-400' : null,
      )}>
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

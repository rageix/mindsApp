'use client';
import FormLabel from '@/components/FormLabel';
import { IFormResponseField } from '@/types/FormResponse';
import { useMemo } from 'react';
import { EFieldType } from '@/types/Form';
import DownloadableFile from '@/components/FormResponseView/Field/DownloadableFile';
import FormattedDate from "@/components/FormattedDate";

interface IProps {
  field: IFormResponseField;
}

export default function FormResponseField({ field }: IProps) {
  const values = useMemo(() => {
    switch (field.type) {
      case EFieldType.Input:
      case EFieldType.TextArea:
      case EFieldType.Email:
      case EFieldType.Select:
        return field.values.map((v) => v.value).join(', ');
      case EFieldType.File:
        return (
          <div className="space-y-3">
            {field.values.map((v, i) => (
              <DownloadableFile
                key={i}
                value={v}
              />
            ))}
          </div>
        );
      case EFieldType.Date:
        return field.values.map((v, i) => <FormattedDate key={i} value={new Date(v.label || '')} time={false} year={true}/>);
    }
  }, [field]);

  return (
    <div>
      <FormLabel className="!text-gray-400">{field.label}</FormLabel>
      <div>{values}</div>
    </div>
  );
}

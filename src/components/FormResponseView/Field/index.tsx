'use client';
import FormLabel from '@/components/FormLabel';
import { IFormResponseField } from '@/types/FormResponse';
import { useMemo } from 'react';
import { EFieldType } from '@/types/Form';

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
        return field.values.map((v, i) => <span key={i}>{v.value}</span>);
      case EFieldType.Date:
        return field.values.map((v, i) => <span key={i}>{v.label}</span>);
    }
  }, [field]);

  return (
    <>
      <FormLabel>{field.label}</FormLabel>
      <div>{values}</div>
    </>
  );
}

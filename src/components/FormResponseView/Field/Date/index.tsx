'use client';
import { useMemo } from 'react';
import { IResponseValue } from '@/types/FormPublicRequest';
import dayjs from "dayjs";

interface IProps {
  value: IResponseValue;
}

export default function Date({ value }: IProps) {
  const formatted = useMemo(() => dayjs(value.label).format(''), [value.label]);

  return <span>{formatted}</span>;
}

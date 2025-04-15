'use client';
import { ISelectOption } from '@/types/SelectOption';
import { EModel } from '@/types/Model';
import Button from '@/components/Buttton';

interface IProps {
  option: ISelectOption<EModel>;
  isSelected: boolean;
  onClick: () => void;
}

export default function SidebarItem({ option, isSelected, onClick }: IProps) {
  return (
    <Button
      variant="blue"
      onClick={onClick}
      isActive={isSelected}
    >
      {option.label}
    </Button>
  );
}

'use client';
import FormBlock from '@/components/FormBlock';
import FormBlockBody from '@/components/FormBlock/FormBlockBody';
import { IFormResponseSection } from '@/types/FormResponse';
import IFormResponseField from '@/components/FormResponseView/Field';

interface IProps {
  section: IFormResponseSection;
}

export default function FormResponseSection({ section }: IProps) {
  return (
    <FormBlock
      title={section.title}
      description={section.description}
    >
      <FormBlockBody className="space-y-3">
        {section.fields.map((v, i) => (
          <IFormResponseField
            key={i}
            field={v}
          />
        ))}
      </FormBlockBody>
    </FormBlock>
  );
}

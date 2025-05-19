'use client';
import { EModel } from '@/types/Model';
import Card from '@/components/Card';
import CardHeader from '@/components/Card/CardHeader';
import CardBody from '@/components/Card/CardBody';
import Markdown from 'react-markdown';
import { modelToLabel } from '@/util/modelToLabel';

interface IProps {
  model: EModel;
  text: string;
}

export default function Model({ model, text }: IProps) {

  const label = modelToLabel(model);

  return (
    <Card>
      <CardHeader>{label}</CardHeader>
      <CardBody>
        <div className="[&>ol]:flex [&>ol]:flex-col [&>ol]:gap-y-3 [&>ol>li]:mt-2 [&>ol>li]:bg-blue-50 [&>ol>li]:p-2">
        <Markdown>{text}</Markdown>
        </div>
      </CardBody>
    </Card>
  );
}

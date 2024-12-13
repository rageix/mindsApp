import { PropsWithChildren } from 'react';
import Logo from '@/components/Logo';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';

interface Props extends PropsWithChildren {
  h2: string;
}

export default function FormWrapper(props: Props) {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="max-w-md mx-auto" >
        <CardBody>
          <div className="">
            <Logo className="h-20 mx-auto" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
              {props.h2}
            </h2>
          </div>

          <div className="mt-10 ">
            {props.children}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

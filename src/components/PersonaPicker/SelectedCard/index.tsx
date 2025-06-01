import { PropsWithChildren } from 'react';
import { IPersona } from '@/types/Persona';
import Image from 'next/image';
import { EyeIcon } from 'lucide-react';

interface IProps extends PropsWithChildren {
  value: IPersona;
  onClickRemove: () => void;
}

export default function SelectedCard({ value, onClickRemove }: IProps) {
  return (
    <div className="flex divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm">
      <div className="shrink-0">
        <Image
          alt=""
          src="/persona-placeholder.webp"
          width="0"
          height="0"
          sizes="100vw"
          className="mx-auto size-10 shrink-0 rounded-full"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900">{value.name}</h3>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <button
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              onClick={onClickRemove}
            >
              <EyeIcon
                aria-hidden="true"
                className="size-5 text-gray-400"
              />
              Remove
            </button>
          </div>
          {/*<div className="-ml-px flex w-0 flex-1">*/}
          {/*  <button*/}
          {/*    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100"*/}
          {/*    onClick={onClickAdd}*/}
          {/*  >*/}
          {/*    <PlusIcon*/}
          {/*      aria-hidden="true"*/}
          {/*      className="size-5 text-gray-400"*/}
          {/*    />*/}
          {/*    Add*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}

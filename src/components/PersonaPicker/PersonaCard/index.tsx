import { PropsWithChildren, useState } from 'react';
import { IPersona } from '@/types/Persona';
import Image from 'next/image';
import { EyeIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { cn } from '@/util/Cn';

interface IProps extends PropsWithChildren {
  value: IPersona;
  onClickAdd?: () => void;
  onClickRemove?: ()=> void;
}

export default function PersonaCard({ value, onClickAdd, onClickRemove }: IProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-100 bg-white text-center shadow-sm">
      <div className="flex flex-1 flex-col p-8">
        <Image
          alt=""
          src="/persona-placeholder.webp"
          width="0"
          height="0"
          sizes="100vw"
          className="mx-auto size-32 shrink-0 rounded-full"
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">{value.name}</h3>
        <dl className="mt-1 flex grow flex-col justify-between">
          <dt className="sr-only">Backstory</dt>
          <dd className="text-sm text-gray-500">
            {value.personality.backstorySnippet}
          </dd>
          {showDetails && (
            <>
              <dt className="sr-only">Style</dt>
              <dd className="text-sm text-gray-500">
                {value.personality.interactionStyle}
              </dd>
            </>
          )}
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <button
              className={cn(
                'relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100',
                showDetails ? 'bg-blue-100' : null,
              )}
              onClick={() => setShowDetails(!showDetails)}
            >
              <EyeIcon
                aria-hidden="true"
                className="size-5 text-gray-400"
              />
              Details
            </button>
          </div>
          {onClickAdd &&
          <div className="-ml-px flex w-0 flex-1">
            <button
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              onClick={onClickAdd}
            >
              <PlusIcon
                aria-hidden="true"
                className="size-5 text-gray-400"
              />
              Add
            </button>
          </div>
          }
          {onClickRemove &&
            <div className="-ml-px flex w-0 flex-1">
              <button
                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                onClick={onClickRemove}
              >
                <MinusIcon
                  aria-hidden="true"
                  className="size-5 text-gray-400"
                />
                Remove
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

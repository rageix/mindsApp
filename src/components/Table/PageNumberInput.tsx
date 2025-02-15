'use client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';

interface Props {
  value: number;
  onChange: (arg: number) => void;
}

export default function PageNumberInput(props: Props) {
  const [value, setValue] = useState<string>(String(props.value + 1));

  useEffect(() => {
    setValue(String(props.value + 1));
  }, [props.value]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const targetValue = e.target.value;
    if (targetValue === '') {
      setValue(targetValue);
      return;
    }
    let parsed = parseInt(targetValue);
    if (parsed < 1) {
      parsed = 1;
    }
    setValue(String(parsed));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let parsed = parseInt(value);
    if (isNaN(parsed) || parsed < 1) {
      parsed = 1;
    }
    props.onChange(parsed - 1);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex rounded-md">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            name="page"
            id="page"
            className="block w-20 rounded-none rounded-l-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 !border-none"
            type="number"
            value={value}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold  bg-blue-700 hover:bg-blue-600 text-white"
        >
          <SearchIcon
            className="-ml-0.5 h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </div>
    </form>
  );
}

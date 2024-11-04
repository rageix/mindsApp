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
      <div className="flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            name="page"
            id="page"
            className="block w-20 rounded-none rounded-l-md border-0 py-1.5  ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-gray-900/80 text-white"
            type="number"
            value={value}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold  bg-blue-700 hover:bg-blue-600 active:bg-blue-800 focus-visible:outline-blue-700 text-white"
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

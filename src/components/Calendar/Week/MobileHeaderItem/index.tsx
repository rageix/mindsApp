interface IProps {
  label: string;
  value: string | number;
}
export default function MobileHeaderItem({ label, value }: IProps) {
  return (
    <button
      type="button"
      className="flex flex-col items-center pb-3 pt-2"
    >
      {label + ' '}
      <span className="mt-1 flex size-8 items-center justify-center font-semibold text-gray-900">
        {value}
      </span>
    </button>
  );
}

interface IProps {
  label: string;
  value: string | number;
}
export default function HeaderItem({ label, value }: IProps) {
  return (
    <div className="flex items-center justify-center py-3">
      <span>
        {label + ' '}
        <span className="items-center justify-center font-semibold text-gray-900">
          {value}
        </span>
      </span>
    </div>
  );
}

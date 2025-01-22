interface IProps {
  line: string[];
  onChange: (value: string) => void;
}

export default function SwatchLine({ line, onChange }: IProps) {
  return (
    <>
      {line.map((v, i) => {
        return (
          <div
            key={i}
            onClick={() => onChange(v)}
            className="aspect-square"
            style={{ backgroundColor: v }}
          />
        );
      })}
    </>
  );
}

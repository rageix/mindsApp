import BlurInput from '@/components/BlurInput';
import FormLabel from '@/components/FormLabel';

interface IProps {
  hex: string;
  onChange: (value: string) => void;
}

export default function HexView({ hex, onChange }: IProps) {
  return (
    <div>
      <FormLabel>Hex</FormLabel>
      <BlurInput
        value={hex}
        onChange={onChange}
      />
    </div>
  );
}

import { IHasId } from '@/types/HasId';
import { IForm } from "@/types/Form";

interface IProps {
  value: IHasId<IForm>;
}
export default function FormItem({ value }: IProps) {
  return <div>{value.name}</div>;
}

import logo from '../../../public/logo.svg';
import Image from 'next/image';

interface Props {
  className?: string;
}

export default function Logo(props: Props) {
  return (
    <Image
      src={logo}
      alt="logo"
      className={props.className}
    />
  );
}

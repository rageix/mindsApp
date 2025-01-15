import logo from '../../../public/logo-small.svg';
import Image from 'next/image';

interface Props {
  className?: string;
}

export default function LogoSmall(props: Props) {
  return (
    <Image
      src={logo}
      alt="logo"
      className={props.className}
    />
  );
}

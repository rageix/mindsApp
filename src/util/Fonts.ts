import { Nunito_Sans } from 'next/font/google';
import { Merriweather } from 'next/font/google';

export const nunitoSans = Nunito_Sans({subsets: ["latin"]});

export const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
});
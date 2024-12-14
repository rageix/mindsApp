'use client';
import { ETheme } from '@/common/Theme';
import themeStore from "@/stores/ThemeStore";

const NAME = 'theme';
const DEFAULT =
  typeof window !== 'undefined' && window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)').matches
    ? ETheme.dark
    : ETheme.light;

class ThemeService {
  save = (theme: ETheme, remember = true) => {
    this.remove();
    themeStore.set({ theme });

    if (remember) {
      localStorage.setItem(NAME, theme);
      return;
    }

    sessionStorage.setItem(NAME, theme);
  };

  get = (): string => {
    if(typeof window === 'undefined') {
      return DEFAULT;
    }

    return (
      sessionStorage.getItem(NAME) || localStorage.getItem(NAME) || DEFAULT
    );
  };

  remove = () => {
    sessionStorage.removeItem(NAME);
    localStorage.removeItem(NAME);
  };
}

const themeService = new ThemeService();
export default themeService;

import { makeObservable } from '@/util/MakeObservable';
import { ETheme } from '@/common/Theme';
import themeService from '@/services/ThemeService';

export interface IThemeStore {
  theme: ETheme;
}

export function newIThemeStore(): IThemeStore {
  let theme = ETheme.light;
  switch (themeService.get()) {
    case ETheme.dark:
      theme = ETheme.dark;
      break;
  }

  return {
    theme,
  };
}

const themeStore = makeObservable<IThemeStore>(newIThemeStore());
export default themeStore;

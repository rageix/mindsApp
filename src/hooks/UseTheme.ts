import { useEffect, useState } from 'react';
import themeStore from "@/stores/ThemeStore";

export default function useTheme() {
  const [data, setData] = useState(themeStore.get());

  useEffect(() => {
    return themeStore.subscribe(setData);
  }, []);

  return data.theme;
}

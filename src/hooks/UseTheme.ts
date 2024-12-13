import { useState } from 'react';
import { ETheme } from "@/common/Theme";

export default function useTheme() {
  const [theme] = useState(ETheme.dark);

  return theme;
}

import React, { createContext, useContext } from 'react';
import { defaultTheme, Theme } from './Theme';
import { SwatchKey } from './Swatch';

export const ThemeContext = createContext<Theme>(defaultTheme);

interface ThemeProviderProps {
  theme: Theme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) =>
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;

/** Returns the Theme object provided by ThemeProvider. */
export const useTheme = () => useContext(ThemeContext);

/** 
 * Returns a Swatch by its key.
 * Note that the swatch must be registered on a Theme and provided by a ThemeProvider.
 */
export const useSwatch = (key: SwatchKey) => {
  const theme = useTheme();

  const swatch = theme.swatches.find(s => s.key === key);
  if (!swatch) {
    const themeSwatchKeys = Object.keys(defaultTheme.swatches).map(k => `'${k}'`).join(', ');
    console.warn(
      'useSwatch(): invalid swatch key.',
      `Using theme '${themeSwatchKeys}', whose valid swatch keys are ${themeSwatchKeys}. The swatch key provided is ${key}`
    );
  }

  return swatch;
};
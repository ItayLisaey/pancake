import React, { createContext, useContext, useMemo } from 'react';
import { Swatch } from 'theme';
import { defaultTheme, Theme } from './Theme';
import { SwatchKey } from './Swatch';

export const ThemeContext = createContext<Theme>(defaultTheme);

export interface ThemeProviderProps {
  theme: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

/** Returns the Theme object provided by ThemeProvider. */
export const useTheme = () => useContext(ThemeContext);


/** 
 * Returns a Swatch by its key.
 * Note that the swatch must be registered on a Theme and provided by a ThemeProvider.
 */
export const useSwatch = (key?: SwatchKey): [swatch: Swatch, isDefault: boolean] => {
  const theme = useTheme();
  const { swatches } = theme;

  const swatch = useMemo(() => key ? swatches.find(s => s.key === key) : undefined, [swatches, key]);
  const defaultSwatch = useMemo(() => swatches[0], [swatches]);

  if (key && !swatch) {
    const themeSwatchKeys = Object.keys(swatches).map(k => `'${k}'`).join(', ');
    console.warn(
      'useSwatch(): invalid swatch key.',
      `Using theme '${themeSwatchKeys}', whose valid swatch keys are ${themeSwatchKeys}. The swatch key provided is ${key}.`,
      'Using default swatch instead'
    );
  }


  return [swatch ?? defaultSwatch, !swatch || (swatch.key === defaultSwatch.key)];
};
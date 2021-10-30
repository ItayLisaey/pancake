import { useMemo } from 'react';
import { Swatch, SwatchKey, Theme, useSwatch, useTheme } from 'theme';
import { kebab, mapEntries, pcake } from 'utils';
import { useCSSVars } from './useCSSVars';

/**
 * Configures a binding between the given Swatch (or the default if not key is provided) and the current Theme
 * to CSS Variables (defined in the returned CSS class).
 * 
 * @param componentName 
 * @param swatchKey 
 * @param vars 
 * @returns 
 */
export const useThemeBinding = (
  componentName: string,
  swatchKey: SwatchKey | undefined,
  varsFn: (swatch: Swatch, theme: Theme) => Record<string, string>
): string => {
  const theme = useTheme();
  const [swatch, isDefault] = useSwatch(swatchKey);

  const vars = useMemo(() => isDefault
    ? {}
    : mapEntries(
      varsFn(swatch, theme),
      ([key, value]) => [kebab(pcake, componentName, key), value]
    ),
    // args is intentionally left out, it is assumed to not change (as a function, not a ref).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [swatch, theme, componentName, isDefault]
  );

  const cssVarsClass = useCSSVars(vars, {
    zeroSpecificity: true,
    classPrefix: kebab(pcake, componentName, 'vars')
  });

  return cssVarsClass;
};
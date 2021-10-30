import { useMemo } from 'react';
import { useVarDeclaration } from 'hook';
import { Swatch, SwatchKey, Theme, useSwatch, useTheme } from 'theme';
import { kebab, mapEntries, pcake } from 'utils';

/**
 * Configures a binding between the given Swatch (or the default if not key is provided) and the current Theme
 * to CSS Variables (defined in the returned CSS class).
 * 
 * `varsFn` is ignored as a dependency, so it's not to be changed between renders.
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
    // varsFn is intentionally left out, it is assumed to not change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [swatch, theme, componentName, isDefault]
  );

  const cssVarsClass = useVarDeclaration(theme, swatch, componentName, vars);

  return cssVarsClass;
};
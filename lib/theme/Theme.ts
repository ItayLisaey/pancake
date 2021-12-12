import { Override } from 'common/types';
import { cssRule, kebab, mapEntries, merge, omit, pcake } from 'utils';
import { createSwatch , Swatch, SwatchInput } from './Swatch';
import { Color } from './Color';

export interface Theme {
  swatches: Swatch[];
  success: Color;
  successLight: Color;
  error: Color;
  errorLight: Color;
  curvature: string;
}

export type DefaultSwatchKey = 'primary' | 'generic';

export const defaultTheme: Theme = {
  swatches: [
    {
      key: 'primary',
      lighter: 'hsl(265, 27%, 85%)',
      light: 'hsl(265, 27%, 75%)',
      primary: 'hsl(265, 27%, 42%)',
      dark: 'hsl(265, 27%, 25%)',
      darker: 'hsl(265, 27%, 15%)'
    },
    {
      key: 'generic',
      lighter: 'hsl(235, 5%, 95%)',
      light: 'hsl(235, 5%, 75%)',
      primary: 'hsl(235, 5%, 50%)',
      dark: 'hsl(235, 5%, 25%)',
      darker: 'hsl(234, 5%, 10%)'
    }
  ],
  success: 'hsl(126, 41%, 61%)',
  successLight: 'hsl(126, 65%, 84%)',
  error: 'hsl(1, 100%, 67%)',
  errorLight: 'hsl(1, 100%, 83%)',
  curvature: '0.5rem'
};


export type createThemeInput = Override<Partial<Theme>, { swatches?: SwatchInput[] }>;

export function createTheme(themeInput: createThemeInput): Theme {
  /** @todo functional alternative */
  if (themeInput.swatches) {
    themeInput.swatches = themeInput.swatches?.map(createSwatch);
  }
  const theme = { ...defaultTheme, ...themeInput } as Theme;

  //------ Initialize variables ------//

  const { swatches } = theme;

  /** Turns a Swatch object into a record of CSS variable  */
  const swatchToVariables = (swatch: Swatch, swatchKey = swatch.key) =>
    mapEntries(
      omit(swatch, 'key'),
      ([key, value]) => [kebab(pcake, 'color', swatchKey, key), value]
    );

  /** @todo consider the case of a swatch keyed 'success' or 'error' overriding these variables. */
  const cssVars: Record<string, string> = {
    ...merge(...swatches.map(swatch => swatchToVariables(swatch))),
    ...swatchToVariables(swatches[0], '0'),
    [kebab(pcake, 'color', 'success')]: theme.success,
    [kebab(pcake, 'color', 'success-light')]: theme.successLight,
    [kebab(pcake, 'color', 'error')]: theme.error,
    [kebab(pcake, 'color', 'error-light')]: theme.errorLight,
    [kebab(pcake, 'curvature')]: theme.curvature,
  };

  //------ Inject into HTML ------//

  const newStyleTag = document.createElement('style');
  document.head.appendChild(newStyleTag);
  newStyleTag.setAttribute(`data-${pcake}-theme`, '');
  newStyleTag.innerHTML = cssRule(':root', cssVars);

  return theme;
}

createTheme({});
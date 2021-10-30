import { CSSVarTuple, Override } from 'common/types';
import { createSwatch } from 'theme';
import { pcake, toCSSVar } from 'utils';
import { Color } from './Color';
import { Swatch, SwatchInput } from './Swatch';

export type ThemeKey = string;

/** @todo change swatches to an array? */

export interface Theme {
  key: ThemeKey;

  swatches: Swatch[];
  success: Color;
  successLight: Color;
  error: Color;
  errorLight: Color;
  curvature: string;
}

export type DefaultSwatchKey = 'primary' | 'generic';

export const defaultTheme: Theme = {
  key: 'default',

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


export type createThemeInput = Override<Partial<Theme>, { key: ThemeKey, swatches?: SwatchInput[] }>;

export function createTheme(themeInput: createThemeInput): Theme {
  /** @todo functional alternative */
  if (themeInput.swatches) {
    themeInput.swatches = themeInput.swatches?.map(createSwatch);
  }
  const theme = { ...defaultTheme, ...themeInput } as Theme;

  //------ Initialize variables ------//

  const { key: themeKey, swatches } = theme;

  /** Turns a Swatch object into a list of CSSVarTuples */
  const swatchToVariables = (swatch: Swatch, swatchKey = swatch.key) =>
    Object.entries(swatch)
      // filter out any non-variable properties
      .filter(([k]) => k !== 'key')
      // map to varname-value tuples
      .map(
        ([key, value]) => [`${pcake()}-${themeKey}-color-${swatchKey}-${key}`, value]
      ) as CSSVarTuple[];

  /** @todo consider the case of a swatch keyed 'success' or 'error' overriding these variables. */
  const cssVarTuples: CSSVarTuple[] = [
    ...swatches.flatMap(swatch => swatchToVariables(swatch)),
    ...swatchToVariables(swatches[0], '0'),
    [`${pcake()}-${themeKey}-color-success`, theme.success],
    [`${pcake()}-${themeKey}-color-success-light`, theme.successLight],
    [`${pcake()}-${themeKey}-color-error`, theme.error],
    [`${pcake()}-${themeKey}-color-error-light`, theme.errorLight],
    [`${pcake()}-${themeKey}-curvature`, theme.curvature],
  ];

  const cssVarsString = cssVarTuples.map(toCSSVar).join('\n');

  //------ Inject into HTML ------//

  const newStyleTag = document.createElement('style');
  document.head.appendChild(newStyleTag);
  newStyleTag.setAttribute('data-pcake-theme', themeKey);
  newStyleTag.sheet!.insertRule(`:root {\n${cssVarsString}\n}`);

  return theme;
}

createTheme({
  key: 'default'
});
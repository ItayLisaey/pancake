import { Override } from 'common/types';
import { Color } from './Color';

export type SwatchKey = string;

export type SwatchInput = Override<Partial<Swatch>, { primary: Color }>;

export interface Swatch {
  key: SwatchKey;
  lighter: Color;
  light: Color;
  primary: Color;
  dark: Color;
  darker: Color;
}

export const createSwatch = (swatchInput: SwatchInput) =>
  /** @todo!!!! */
  swatchInput as unknown as Swatch;

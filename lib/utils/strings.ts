import { CSSVarTuple } from 'common/types';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const lettersAndDigits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

export const randomString = (length: number, pool: string[] = lettersAndDigits): string => [...Array(length).keys()]
  .map(() => pool[randomInt(0, pool.length - 1)])
  .join('');

export const kebabCase = (str: string) => str.split(/(?=[A-Z])/)
  .map(segment => segment.toLocaleLowerCase())
  .join('-');

/**
 * The global pcake class, used to distinguish pancake elements from the rest.
 */
export const pcake = 'pcake';

export const toCSSVar = ([varname, value]: CSSVarTuple) => `--${varname}: ${value};`;

/** Turns all strings passed to kebab-case and joins them. */
export const kebab = (...strings: string[]): string => strings
  .flatMap(s => s.split(/-|(?=[A-Z])/))
  .map(s => s.toLowerCase())
  .join('-');

import { CSSVarTuple } from 'common/types';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const lettersAndDigits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

export const randomString = (length: number, pool: string[] = lettersAndDigits) => Array(length).map(() => pool[randomInt(0, pool.length - 1)]);

export const kebabCase = (str: string) => str.split(/(?=[A-Z])/)
  .map(segment => segment.toLocaleLowerCase())
  .join('-');

/**
 * The global pcake class, used to distinguish pancake elements from the rest.
 */
export const pcake = () => 'pcake';

export const toCSSVar = ([varname, value]: CSSVarTuple) => `--${varname}: ${value};`;
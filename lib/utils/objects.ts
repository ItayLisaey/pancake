import { ValueOf } from 'common/types';

export const merge = (...objects: object[]) => objects.reduce((acc, o) => ({ ...acc, ...o }), {});

type KVPair<O extends object> = [k: keyof O, v: ValueOf<O>];

export const mapEntries = <O extends object>(obj: O, mapper: (kv: KVPair<O>) => [string, string]): Record<string, string> =>
  (Object.entries(obj) as KVPair<O>[])
    .map(mapper)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

export const omit = <O extends object, K extends keyof O>(obj: O, ...keys: K[]): Omit<O, K> => {
  const keySet = new Set(keys);

  return (Object.entries(obj) as KVPair<O>[])
    .filter(([k]) => !keySet.has(k as K))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Omit<O, K>);
};

export const isEmpty = (obj: object) => Object.keys(obj).length === 0;
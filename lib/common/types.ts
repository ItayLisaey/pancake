export type Override<T, O> = Omit<T, keyof O> & O;

export type CSSVarTuple = [varname: string, value: string];

export type ValueOf<O extends object> = O[keyof O];
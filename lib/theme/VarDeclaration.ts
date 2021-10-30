import { ClassName } from 'common/types';
import { Swatch } from 'theme';
import { cssRule, kebab } from 'utils';

export type VarDeclaration = ClassName;

export const createVarDeclaration = (
  vars: Record<string, string>,
  className: string,
  zeroSpecificity = false
): VarDeclaration => {
  const styleTag = document.createElement('style');
  document.head.appendChild(styleTag);

  styleTag.sheet!.insertRule(
    cssRule(
      zeroSpecificity ? `:where(.${className})` : `.${className}`,
      vars
    )
  );

  return className;
};

/**
 * A simple wrapper over Map to cache var declarations for a given combination
 * of theme, swatch and component.
 * 
 * This Cache is to be nested under (and scoped to) a specific theme object
 * (which is why the methods require only a swatch and a componentName).
 */
export class VarDeclarationCache {
  private readonly cache = new Map<string, ClassName>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  private keyOf(swatch: Swatch, componentName: string): string {
    return kebab(swatch.key, componentName);
  }

  get(swatch: Swatch, componentName: string): ClassName | null {
    return this.cache.get(this.keyOf(swatch, componentName)) ?? null;
  }

  set(swatch: Swatch, componentName: string, className: ClassName) {
    this.cache.set(this.keyOf(swatch, componentName), className);
  }
}
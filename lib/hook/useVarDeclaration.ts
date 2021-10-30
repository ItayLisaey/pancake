import { kebab, pcake, randomString } from 'utils';
import { Swatch, createVarDeclaration, Theme, VarDeclarationCache } from '../theme';

const varDeclarationsByTheme = new Map<Theme, VarDeclarationCache>();

/** 
 * Creates a var declaration or returns a cached declaration, if a matching one exists.
 * 
 * @returns a className which contains the CSS variable defintions.
 */
export const useVarDeclaration = (theme: Theme, swatch: Swatch, componentName: string, vars: Record<string, string>) => {
  const varDeclarations = varDeclarationsByTheme.get(theme) ?? new VarDeclarationCache();

  const cachedClassName = varDeclarations.get(swatch, componentName);
  if (cachedClassName) {
    return cachedClassName;
  }

  // Create a declaration, cache it, and update varDeclarationsByTheme

  const className = `${kebab(pcake, swatch.key, componentName, 'vars')}-${randomString(5)}`;
  createVarDeclaration(vars, className, true);
  varDeclarations.set(swatch, componentName, className);

  varDeclarationsByTheme.set(theme, varDeclarations);

  return className;
};
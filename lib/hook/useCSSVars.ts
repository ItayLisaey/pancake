import { useEffect, useMemo } from 'react';
import { cssRule, kebab, pcake, randomString } from 'utils/strings';
import { usePreRenderEffect } from './usePreRenderEffect';

export interface useCSSVarsOptions {
  classPrefix?: string;
  zeroSpecificity?: boolean
}

export const useCSSVars = (vars: Record<string, string>, {
  classPrefix = kebab(pcake, 'vars'),
  zeroSpecificity = false
}: useCSSVarsOptions = {}) => {
  const className = useMemo(() => `${classPrefix}-${randomString(5)}`, [classPrefix]);

  const styleTag = useMemo(() => document.createElement('style'), []);
  document.head.appendChild(styleTag);

  // Inject styleTag to the head
  useEffect(() => () => styleTag.remove(), [styleTag]);

  // Insert the rule to the style
  usePreRenderEffect(() => {
    styleTag.innerHTML = (
      cssRule(
        zeroSpecificity ? `:where(.${className})` : `.${className}`,
        vars
      ));

    return () => { styleTag.textContent = ''; };
  }, [styleTag, className, vars, zeroSpecificity]);

  return className;
};
import { useEffect, useMemo } from 'react';
import { kebabCase, pcake, randomString } from 'utils/strings';

export const useCSSVariables = (vars: Record<string, string>, classPrefix = `${pcake()}-vars`) => {
  const className = useMemo(() => `${classPrefix}-${randomString(5)}`, [classPrefix]);

  useEffect(() => {
    const styleTag = document.createElement('style');
    document.head.appendChild(styleTag);

    const cssRules = Object.values(vars).map(([key, value]) => `--${kebabCase(key)}: ${value};`).join('\n');
    styleTag.sheet!.insertRule(`.${className} {\n${cssRules}\n}`);

    return () => styleTag.remove();
  }, [className, vars]);

  return className;
};
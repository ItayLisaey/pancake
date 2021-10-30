import { useEffect, useMemo } from 'react';
import { kebab, kebabCase, pcake, randomString, toCSSVar } from 'utils/strings';

export const useCSSVariables = (vars: Record<string, string>, classPrefix = kebab(pcake, 'vars')) => {
  const className = useMemo(() => kebab(classPrefix, randomString(5)), [classPrefix]);

  const styleTag = useMemo(() => document.createElement('style'), []);
  // Inject styleTag to the head
  useEffect(() => {
    document.head.appendChild(styleTag);
    return () => styleTag.remove();
  }, [styleTag]);

  useEffect(() => {
    const cssRules = Object.entries(vars)
      .map(([key, value]) => [kebabCase(key), value] as [string, string])
      .map(toCSSVar)
      .join('\n');

    styleTag.sheet?.insertRule(`.${className} {\n${cssRules}\n}`);

    return () => styleTag.sheet?.deleteRule(0);
  }, [styleTag, className, vars]);

  return className;
};
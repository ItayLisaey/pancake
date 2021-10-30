import { useMemo, useRef } from 'react';
import { kebabCase, pcake, randomString } from 'utils/strings';

export const useCSSVariables = (vars: Record<string, string>, classPrefix = `${pcake()}-vars`) => {
  const className = useMemo(() => `${classPrefix}-${randomString(5)}`, [classPrefix]);

  const stylesRef = useRef<HTMLStyleElement | null>(null);

  stylesRef.current?.remove();

  const newStyleTag = document.createElement('style');
  document.head.appendChild(newStyleTag);

  const cssRules = Object.values(vars).map(([key, value]) => `--${kebabCase(key)}: ${value};`).join('\n');
  const sheet = newStyleTag.sheet!;
  sheet.deleteRule(0);
  sheet.insertRule(cssRules, 0);

  stylesRef.current = newStyleTag;

  return className;
};
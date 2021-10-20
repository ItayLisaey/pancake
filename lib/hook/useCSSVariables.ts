import { useMemo, useRef } from 'react';
import { kebabCase, randomString } from '../utils/strings';

export const useCSSVariables = (vars: Record<string, string>, classPrefix = 'pancake-variables') => {
  const className = useMemo(() => `${classPrefix}-${randomString(5)}`, [classPrefix]);

  const stylesRef = useRef<HTMLStyleElement | null>(null);

  const newStyleTag = document.createElement('style');
  const cssRules = Object.values(vars).map(([key, value]) => `--${kebabCase(key)}: ${value};`).join('\n');
  newStyleTag.innerHTML = `.${className} {\n${cssRules}\n}`;

  stylesRef.current?.remove();
  stylesRef.current = newStyleTag;
  document.head.appendChild(newStyleTag);

  return className;
};
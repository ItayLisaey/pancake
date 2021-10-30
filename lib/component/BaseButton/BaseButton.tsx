import classNames from 'classnames/dedupe';
import { useMemo } from 'react';
import { pcake } from 'utils/strings';
import { BaseComponentProps } from 'common';

import { useSwatch } from 'theme';
import { useCSSVariables } from 'hook/useCSSVariables';
import classes from './base-button.module.scss';

type HTMLButtonProps = JSX.IntrinsicElements['button'];

export interface BaseButtonProps extends HTMLButtonProps, BaseComponentProps { }

export const BaseButton: React.VFC<BaseButtonProps> = ({ className, swatch: swatchKey, ...buttonProps }) => {
	const [swatch, isDefault] = useSwatch(swatchKey);

	const cssVars = useMemo(() => (isDefault ? {} : {
		'pcakeBaseButtonBase': swatch.primary,
		'pcakeBaseButtonHover': swatch.dark,
		'pcakeBaseButtonActive': swatch.darker,
	}) as Record<string, string>, [swatch, isDefault]);

	const cssVarsClass = useCSSVariables(cssVars);


	return (
		<button className={classNames(pcake(), cssVarsClass, classes.root, className)} {...buttonProps} />
	);
};

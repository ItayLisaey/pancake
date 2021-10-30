import classNames from 'classnames/dedupe';
import { pcake } from 'utils/strings';
import { BaseComponentProps } from 'common';

import { useThemeBinding } from 'hook';
import classes from './base-button.module.scss';

type HTMLButtonProps = JSX.IntrinsicElements['button'];

export interface BaseButtonProps extends HTMLButtonProps, BaseComponentProps { }

export const BaseButton: React.VFC<BaseButtonProps> = ({ className, swatch: swatchKey, ...buttonProps }) => {
	const cssVarsClass = useThemeBinding('BaseButton', swatchKey, (swatch, theme) => ({
		curvature: theme.curvature,
		base: swatch.primary,
		hover: swatch.dark,
		active: swatch.darker
	}));

	return (
		<button className={classNames(pcake, cssVarsClass, classes.root, className)} {...buttonProps} />
	);
};

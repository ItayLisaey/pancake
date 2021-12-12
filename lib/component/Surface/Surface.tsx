import { JSXElementConstructor } from 'react';
import classNames from 'classnames/dedupe';
import { pcake } from 'utils/strings';
import { HTMLElementProps } from 'common/HTMLElementProps';
import { BaseComponentProps } from 'common';
import { useThemeBinding } from 'hook';
import classes from './surface.module.scss';

export interface SurfaceProps extends HTMLElementProps, BaseComponentProps {
	/** Which component to use for the surface */
	component?: string | JSXElementConstructor<any>; 
	/** 
	 * By default, Surface is set to have `inline-block` positioning.
	 * The `block` prop sets it to `block`, instead.
	 */
	block?: boolean;
}

export const Surface: React.VFC<SurfaceProps> = ({ component: Component = 'div', className, swatch: swatchKey, block, ...props }) => {
	const cssVarsClass = useThemeBinding('Surface', swatchKey, (swatch, theme) => ({
		background: swatch.lighter,
		curvature: theme.curvature
	}));

	return (
		<Component className={classNames(pcake, cssVarsClass, classes.root, block && classes.block, className)} {...props} />
	);
};

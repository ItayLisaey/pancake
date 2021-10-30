import { JSXElementConstructor, useMemo } from 'react';
import classNames from 'classnames/dedupe';
import { pcake } from 'utils/strings';
import { HTMLElementProps } from 'common/HTMLElementProps';
import { useSwatch, useTheme } from 'theme';
import { useCSSVariables } from 'hook/useCSSVariables';
import { BaseComponentProps } from 'common';
import classes from './surface.module.scss';

export interface SurfaceProps extends HTMLElementProps, BaseComponentProps {
	component?: string | JSXElementConstructor<any>
}

export const Surface: React.VFC<SurfaceProps> = ({ component: Component = 'div', className, swatch: swatchKey, ...props }) => {
	const theme = useTheme();
	const [swatch, isDefault] = useSwatch(swatchKey);

	const cssVars = useMemo(() => (isDefault ? {} : {
		'pcakeSurfaceBackground': swatch.lighter,
		'pcakeSurfaceCurvature': theme.curvature,
	}) as Record<string, string>, [swatch, isDefault, theme]);

	const cssVarsClass = useCSSVariables(cssVars);

	return (
		<Component className={classNames(pcake, cssVarsClass, classes.root, className)} {...props} />
	);
};

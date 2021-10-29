import { JSXElementConstructor } from 'react';
import classNames from 'classnames/dedupe';

import { pcake } from '../../utils/strings';
import classes from './surface.module.scss';

/** Inferred from the properties of JSX.IntrinsicElement */
type BaseElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export interface SurfaceProps extends BaseElementProps {
	component?: string | JSXElementConstructor<any>
}

export const Surface: React.VFC<SurfaceProps> = ({ component: Component = 'div', className, ...props }) => (
	<Component className={classNames(pcake(), classes.root, className)} {...props} />
);

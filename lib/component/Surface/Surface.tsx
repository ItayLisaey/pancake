import { JSXElementConstructor } from 'react';
import classNames from 'classnames/dedupe';

import { pcake } from '../../utils/strings';
import { HTMLElementProps } from '../../common/HTMLElementProps';
import classes from './surface.module.scss';


export interface SurfaceProps extends HTMLElementProps {
	component?: string | JSXElementConstructor<any>
}

export const Surface: React.VFC<SurfaceProps> = ({ component: Component = 'div', className, ...props }) => (
	<Component className={classNames(pcake(), classes.root, className)} {...props} />
);

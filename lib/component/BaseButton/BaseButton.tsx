import clsx from 'clsx';
import { pcake } from '../../utils/strings';

import classes from './base-button.module.scss';

export type BaseButtonProps = JSX.IntrinsicElements['button'];

export const BaseButton: React.VFC<BaseButtonProps> = ({ className, ...buttonProps }) => (
	<button className={clsx(pcake(), classes.root, className)} {...buttonProps} />
);

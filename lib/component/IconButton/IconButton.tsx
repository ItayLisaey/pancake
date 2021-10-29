import classNames from 'classnames/dedupe';
import { ReactNode } from 'react';
import { pcake } from '../../utils/strings';
import { BaseButton, BaseButtonProps } from '../BaseButton';
import classes from './icon-button.module.scss';

export interface IconButtonProps extends BaseButtonProps {
	children: ReactNode
}

export const IconButton: React.VFC<IconButtonProps> = ({ className, ...baseButtonProps }) => (
	<BaseButton className={classNames(pcake(), classes.root, className)} {...baseButtonProps} />
);

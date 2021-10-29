import classNames from 'classnames/dedupe';
import { pcake } from 'utils/strings';
import { BaseComponentProps } from 'common';

import classes from './base-button.module.scss';

type HTMLButtonProps = JSX.IntrinsicElements['button'];

export interface BaseButtonProps extends HTMLButtonProps, BaseComponentProps { }

export const BaseButton: React.VFC<BaseButtonProps> = ({ className, ...buttonProps }) => (
	<button className={classNames(pcake(), classes.root, className)} {...buttonProps} />
);

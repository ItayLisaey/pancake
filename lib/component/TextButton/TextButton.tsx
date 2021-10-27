import cls from 'classnames/dedupe';
import { ReactNode } from 'react';
import { pcake } from '../../utils/strings';
import { BaseButton, BaseButtonProps } from '../BaseButton';
import classes from './text-button.module.scss';

export interface TextButtonProps extends BaseButtonProps {
	children: ReactNode;
	preText?: ReactNode;
	postText?: ReactNode
}

export const TextButton: React.VFC<TextButtonProps> = ({ children, preText, postText, className, ...baseButtonProps }) => {
	if (import.meta.env.DEV && !children) {
		console.warn(
			`TextButton received an empty value for children: ${children}. TextButton must receive children as props.`,
			"If you're looking to display an icon only, please use IconButton."
		);
	}

	return (
		<BaseButton className={cls(pcake(), classes.root, className)} {...baseButtonProps}>
			{preText}
			<span className={classes.children}>{children}</span>
			{postText}
		</BaseButton>
	);
};

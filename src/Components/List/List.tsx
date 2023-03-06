import React, {ReactNode} from 'react';

import './List.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import Button from '../../UIKit/Elemets/Button/Button';

type TList = {
	children: ReactNode;
	label?: string;
	labelAddButton: string;
	addButtonHandler: () => void;
	id: string;
	header?: ReactNode;
	href?: string;
};

const List = (props: TList) => {
	const {children} = props;
	return (
		<div id={props.id} className="list-container">
			<div className="list-container__header">
				{props.header ? (
					props.header
				) : (
					<div className="list-container__header__label CustomFontBold">{props.label}</div>
				)}
			</div>
			<div className="list-container__body">
				<div className="list-container__body__list">{children}</div>
			</div>
			<div className="list-container__footer">
				{props.href ? (
					<a className="Button CustomFontSemiBold" href={props.href}>
						{props.labelAddButton}
					</a>
				) : (
					<Button title={props.labelAddButton} onClick={props.addButtonHandler} />
				)}
			</div>
		</div>
	);
};

export default List;

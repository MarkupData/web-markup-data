import React from 'react';

import './MenuElements.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {EnumItemsMenu} from '../../Lib/Redux/Menu/slice';

type IItem = {
	label: string;
	value: EnumItemsMenu;
};

type IMenuElementsProps = {
	listItem: IItem[];
	activeItem: string;
	onChange: ((value: EnumItemsMenu) => void) | null;
};

const MenuElements = (props: IMenuElementsProps) => {
	const {listItem, activeItem, onChange} = props;

	return (
		<div className="menu-elements">
			{listItem.map((item: IItem) => (
				<div
					key={item.value}
					className={`CustomFontRegular menu-elements__item ${
						item.value === activeItem ? '-is-active' : ''
					}`}
					onClick={() => {
						onChange ? onChange(item.value) : null;
					}}
				>
					{item.label}
				</div>
			))}
		</div>
	);
};

export default MenuElements;

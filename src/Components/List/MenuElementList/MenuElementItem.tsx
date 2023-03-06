import React from 'react';

import './MenuElementList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import {ElementMenu, ElementMenuRoot} from '../../../Lib/Redux/MenuElements/slice';

type IMenuElementListProps = {
	data: ElementMenuRoot;
	onHandlerClick: (value: ElementMenuRoot) => void;
};

const MenuElementItem = (props: IMenuElementListProps) => {
	const {data, onHandlerClick} = props;
	return (
		<div onClick={() => onHandlerClick(data)} className="menu-element-list__item">
			<div className="menu-element-list__item__header">
				<div className="menu-element-list__item__header__name CustomFontMedium">{data.name}</div>
				<div className="menu-element-list__item__header__status -is-online CustomFontRegular">
					<div className="menu-element-list__item__header__status__cr -is-online"></div>
					Online
				</div>
			</div>
			{/* <div className="menu-element-list__item__address CustomFontRegular">{data.description}</div> */}
		</div>
	);
};

export default MenuElementItem;

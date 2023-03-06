import React from 'react';

import './DishList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import {Dish} from '../../../Lib/Redux/Dishes/slice';

type IDishListProps = {
	data: Dish;
	onHandlerClick: (value: Dish) => void;
};

const DishItem = (props: IDishListProps) => {
	const {data, onHandlerClick} = props;
	return (
		<div onClick={() => onHandlerClick(data)} className="dishes-list__item">
			<div className="dishes-list__item__header">
				<div className="dishes-list__item__header__name CustomFontMedium">{data.name}</div>
				<div className="dishes-list__item__header__status -is-online CustomFontRegular">
					<div className="dishes-list__item__header__status__cr -is-online"></div>
					Online
				</div>
			</div>
			<div className="dishes-list__item__address CustomFontRegular">{data.price}</div>
		</div>
	);
};

export default DishItem;

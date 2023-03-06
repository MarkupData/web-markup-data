import React, {useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import './RestaurantList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import List from '../List';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {Table} from '../../../Lib/Redux/Tables/slice';
import {selectRestaurantsList} from '../../../Lib/Redux/Restaurants/Selectors/selectRestaurantsList';
import {useDispatch} from 'react-redux';
import {Restaurant} from '../../../Lib/Redux/Restaurants/slice';
import {popupActions} from '../../../Lib/Redux/Popup/Actions/PopupActions';
import CreateRestaurant from '../../CreateElement/CreateRestaurant';
import {restaurantsActions} from '../../../Lib/Redux/Restaurants/Actions/RestaurantsActions';

const RestaurantList = () => {
	const restaurantsData = useStoreSelector(selectRestaurantsList);
	const dispatch = useDispatch();

	// TODO: navigation set url
	// const navigate = useNavigate();
	// navigate(EnumRoutes.MARKUP_DATA);

	useEffect(() => {
		dispatch(restaurantsActions.getList());
	}, []);

	const addButtonHandler = useCallback(() => {
		dispatch(
			popupActions.open({
				children: (
					<CreateRestaurant
						data={null}
						cancalHandler={() => dispatch(popupActions.close())}
						isVertical={true}
					/>
				),
			}),
		);
	}, [popupActions.close]);

	const itemClickHandler = useCallback((item: Table) => {
		dispatch(restaurantsActions.handler(item.id));
	}, []);

	return (
		<List
			id={'list-restaurants'}
			label={'Restaurants'}
			labelAddButton={'Add restaurant'}
			addButtonHandler={addButtonHandler}
		>
			{restaurantsData?.map((item: Restaurant) => (
				<div onClick={() => itemClickHandler(item)} key={item.id} className="restaurant-list__item">
					<div className="restaurant-list__item__header">
						<div className="restaurant-list__item__header__name CustomFontMedium">{item.name}</div>
						<div className="restaurant-list__item__header__status -is-online CustomFontRegular">
							<div className="restaurant-list__item__header__status__cr -is-online"></div>
							Online
						</div>
					</div>
					<div className="restaurant-list__item__address CustomFontRegular">{item.address}</div>
				</div>
			))}
		</List>
	);
};

export default RestaurantList;

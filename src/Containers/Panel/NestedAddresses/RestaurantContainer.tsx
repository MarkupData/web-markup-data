import React from 'react';
import Restaurant from '../../../Components/Elements/Restaurant/Restaurant';
import RestaurantList from '../../../Components/List/RestaurantList/RestaurantList';
import {THomeContainerProps} from '../../Home/HomeContainer';
import {EnumNestedAddresses} from '../type';

const RestaurantContainer = (props: THomeContainerProps) => {
	const menu_item = props.address.split('>')[1];

	switch (menu_item) {
		case EnumNestedAddresses.LIST:
			return <RestaurantList />;
		case EnumNestedAddresses.ELEMENT:
			return <Restaurant {...props} />;
		default:
			return null;
	}
};

export default RestaurantContainer;

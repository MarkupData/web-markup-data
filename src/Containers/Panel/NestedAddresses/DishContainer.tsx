import React from 'react';
import DishList from '../../../Components/List/DishList/DishList';
import {THomeContainerProps} from '../../Home/HomeContainer';
import {EnumNestedAddresses} from '../type';

const DishContainer = (props: THomeContainerProps) => {
	const menu_item = props.address.split('>')[1];

	switch (menu_item) {
		case EnumNestedAddresses.LIST:
			return <DishList />;
		case EnumNestedAddresses.ELEMENT:
			return <DishList />;
		case EnumNestedAddresses.CREATE:
			return <DishList />;
		default:
			return null;
	}
};

export default DishContainer;

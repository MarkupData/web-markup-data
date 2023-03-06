import React, {useCallback, useState} from 'react';

import './PanelContainer.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {THomeContainerProps} from '../Home/HomeContainer';
import {EnumItemsMenu} from '../../Lib/Redux/Menu/slice';
import {EnumTypeEmployees} from '../../Lib/Redux/Employees/slice';
import EmployeeList from '../../Components/List/EmployeeList/EmployeeList';
import TableList from '../../Components/List/TableList/TableList';
import RestaurantList from '../../Components/List/RestaurantList/RestaurantList';
import {animated, useTransition, config} from 'react-spring';
import MenuElementList from '../../Components/List/MenuElementList/MenuElementList';
import DishList from '../../Components/List/DishList/DishList';
import RestaurantContainer from './NestedAddresses/RestaurantContainer';
import EmployeeContainer from './NestedAddresses/EmployeeContainer';
import MenuElementContainer from './NestedAddresses/MenuElementContainer';
import DishContainer from './NestedAddresses/DishContainer';

const PanelContainer = (props: THomeContainerProps) => {
	const menu_item = props.address.split('>')[0];

	switch (menu_item) {
		case EnumItemsMenu.HOME:
			return <div>Home</div>;
		case EnumItemsMenu.RESTAURANT:
			return <RestaurantContainer {...props} />;
		case EnumItemsMenu.MENU:
			return <MenuElementContainer {...props} />;
		case EnumItemsMenu.EMPLOYEES:
			return <EmployeeContainer {...props} />;
		case EnumItemsMenu.DISHES:
			return <DishContainer {...props} />;
		case EnumItemsMenu.REPORTS:
			return <div>Reports</div>;
		default:
			return null;
	}
};

export default PanelContainer;

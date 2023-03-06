import React from 'react';
import Menu from '../../../Components/Elements/Menu/Menu';
import MenuElementList from '../../../Components/List/MenuElementList/MenuElementList';
import {THomeContainerProps} from '../../Home/HomeContainer';
import {EnumNestedAddresses} from '../type';

const MenuElementContainer = (props: THomeContainerProps) => {
	const menu_item = props.address.split('>')[1];

	switch (menu_item) {
		case EnumNestedAddresses.LIST:
			return <MenuElementList />;
		case EnumNestedAddresses.ELEMENT:
			return <Menu {...props} />;
		case EnumNestedAddresses.CREATE:
			return <MenuElementList />;
		default:
			return null;
	}
};

export default MenuElementContainer;

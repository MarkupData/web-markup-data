import React from 'react';

import './PanelContainer.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {THomeContainerProps} from '../Home/HomeContainer';
import {EnumItemsMenu} from '../../Lib/Redux/Menu/slice';
import ProjectContainer from './NestedAddresses/ProjectContainer';

const PanelContainer = (props: THomeContainerProps) => {
	const menu_item = props.address.split('>')[0];

	switch (menu_item) {
		case EnumItemsMenu.HOME:
			return <div>Home</div>;
		case EnumItemsMenu.PROJECTS:
			return <ProjectContainer {...props} />;
		default:
			return null;
	}
};

export default PanelContainer;

import React from 'react';
import Project from '../../../Components/Elements/Project/Project';
import ProjectList from '../../../Components/List/ProjectList/ProjectList';
import {THomeContainerProps} from '../../Home/HomeContainer';
import {EnumNestedAddresses} from '../type';

const ProjectContainer = (props: THomeContainerProps) => {
	const menu_item = props.address.split('>')[1];

	switch (menu_item) {
		case EnumNestedAddresses.LIST:
			return <ProjectList />;
		case EnumNestedAddresses.ELEMENT:
			return <Project {...props} />;
		case EnumNestedAddresses.CREATE:
			return <Project {...props} />;
		default:
			return null;
	}
};

export default ProjectContainer;

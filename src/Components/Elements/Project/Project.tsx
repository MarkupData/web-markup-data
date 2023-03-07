import React, {useState} from 'react';

import './Project.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {useDispatch} from 'react-redux';
import {THomeContainerProps} from '../../../Containers/Home/HomeContainer';
import {selectProjectCurrent} from '../../../Lib/Redux/Projects/Selectors/selectProjectCurrent';

const Project = (props: THomeContainerProps) => {
	const {data, isLoading} = useStoreSelector(selectProjectCurrent);
	const dispatch = useDispatch();

	return <div className="project"></div>;
};

export default Project;

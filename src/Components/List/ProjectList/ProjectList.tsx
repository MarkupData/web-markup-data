import React, {useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import './ProjectList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import List from '../List';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {selectProjectsList} from '../../../Lib/Redux/Projects/Selectors/selectProjectsList';
import {useDispatch} from 'react-redux';
import {popupActions} from '../../../Lib/Redux/Popup/Actions/PopupActions';
import CreateProject from '../../CreateElement/CreateProject';
import {projectsActions} from '../../../Lib/Redux/Projects/Actions/ProjectsActions';
import {ProjectItem} from '../../../Lib/Redux/Projects/slice';

const ProjectList = () => {
	const restaurantsData = useStoreSelector(selectProjectsList);
	const dispatch = useDispatch();

	// TODO: navigation set url
	// const navigate = useNavigate();
	// navigate(EnumRoutes.MARKUP_DATA);

	useEffect(() => {
		dispatch(projectsActions.getList());
	}, []);

	const addButtonHandler = useCallback(() => {
		dispatch(
			popupActions.open({
				children: (
					<CreateProject
						data={null}
						cancalHandler={() => dispatch(popupActions.close())}
						isVertical={true}
					/>
				),
				isCanClouse: true,
			}),
		);
	}, [popupActions.close]);

	const itemClickHandler = useCallback((item: ProjectItem) => {
		dispatch(projectsActions.handler(item.id));
	}, []);

	return (
		<List
			id={'list-projects'}
			label={'Projects'}
			labelAddButton={'Add project'}
			addButtonHandler={addButtonHandler}
		>
			{restaurantsData?.map((item: ProjectItem) => (
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

export default ProjectList;

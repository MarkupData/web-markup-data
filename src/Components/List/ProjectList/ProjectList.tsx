import React, {useCallback, useEffect, useState} from 'react';
import {IconButton} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';

import './ProjectList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import List from '../List';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {selectProjectsList} from '../../../Lib/Redux/Projects/Selectors/selectProjectsList';
import {useDispatch} from 'react-redux';
import {popupActions} from '../../../Lib/Redux/Popup/Actions/PopupActions';
import CreateProject from '../../CreateElement/CreateProject';
import {projectsActions} from '../../../Lib/Redux/Projects/Actions/ProjectsActions';
import {Project} from '../../../Lib/Redux/Projects/slice';

const ITEM_HEIGHT = 48;
enum OPTIONS {
	EDIT = 'Edit',
	DELETE = 'Delete',
	EXPORT = 'Export',
}

const ProjectList = () => {
	const restaurantsData = useStoreSelector(selectProjectsList);
	const dispatch = useDispatch();
	const [openId, setOpenId] = useState<number | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>, id: number | null) => {
		event.stopPropagation();
		setOpenId(id);
	};

	const itemClick = (event: React.MouseEvent<HTMLElement>, option: string, data: Project) => {
		handleClick(event, null);
		switch (option) {
			case OPTIONS.EDIT:
				dispatch(
					popupActions.open({
						children: (
							<CreateProject
								id={data.id}
								data={data}
								cancalHandler={() => dispatch(popupActions.close())}
								isVertical={true}
							/>
						),
						isCanClouse: true,
					}),
				);
				break;
			case OPTIONS.DELETE:
				dispatch(projectsActions.delete(data.id));
				break;
		}
	};

	// TODO: navigation set url (import {useNavigate} from 'react-router-dom';)
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
						data={undefined}
						cancalHandler={() => dispatch(popupActions.close())}
						isVertical={true}
					/>
				),
				isCanClouse: true,
			}),
		);
	}, [popupActions.close]);

	const itemClickHandler = useCallback((item: Project) => {
		dispatch(projectsActions.handler(item.id));
	}, []);

	console.log('restaurantsData-', restaurantsData);

	return (
		<List
			id={'list-projects'}
			label={'Projects'}
			labelAddButton={'Add project'}
			addButtonHandler={addButtonHandler}
		>
			{restaurantsData?.map((item: Project) => (
				<div onClick={() => itemClickHandler(item)} key={item.id} className="projects-list__item">
					<div className="projects-list__item__header">
						<div className="projects-list__item__header__name CustomFontMedium">{item.name}</div>
						<div className="projects-list__item__botton">
							<IconButton
								aria-label="more"
								id="long-button"
								aria-controls={openId === item.id ? 'long-menu' : undefined}
								aria-expanded={openId === item.id ? 'true' : undefined}
								aria-haspopup="true"
								onClick={(e) => handleClick(e, item.id && openId === null ? item.id : null)}
							>
								<MoreVertIcon />
							</IconButton>
							{openId === item.id && (
								<>
									<div
										className="paper-root"
										onClick={(e) => {
											setOpenId(null);
											e.stopPropagation();
										}}
									></div>
									<Paper
										elevation={3}
										sx={{
											maxHeight: ITEM_HEIGHT * 4.5,
											width: '20ch',
											position: 'absolute',
											zIndex: 20,
										}}
									>
										{Object.values(OPTIONS).map((option: string) => (
											<MenuItem
												key={option + item.id}
												selected={option === 'Pyxis'}
												onClick={(e) => itemClick(e, option, item)}
											>
												{option}
											</MenuItem>
										))}
									</Paper>
								</>
							)}
						</div>
					</div>
					<div className="projects-list__item__header__status -is-online CustomFontRegular">
						{item.task_class}
					</div>
				</div>
			))}
		</List>
	);
};

export default ProjectList;

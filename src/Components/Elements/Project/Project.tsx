import React, {useEffect, useState} from 'react';
import _ from 'lodash';

import './Project.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {useDispatch} from 'react-redux';
import {TLabelProps, TTaskClassesProps} from '../../../Lib/Redux/Projects/slice';
import {projectsActions} from '../../../Lib/Redux/Projects/Actions/ProjectsActions';
import {selectProjectCurrent} from '../../../Lib/Redux/Projects/Selectors/selectProjectCurrent';
import {selectTaskClasses} from '../../../Lib/Redux/Projects/Selectors/selectTaskClasses';
import Spinner from '../../Spinner/Spinner';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Labels from '../../CreateElement/Labels/Labels';

const Project = () => {
	const {isLoading, data} = useStoreSelector(selectProjectCurrent);
	const taskClasses = useStoreSelector(selectTaskClasses);
	const [name, setName] = useState<string>(data?.name || '');
	const [task_class, set_task_class] = useState<number | undefined>(
		data?.task_class?.id || undefined,
	);
	const [labels, setLabels] = useState<TLabelProps[]>([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!_.isUndefined(data)) {
			setName(data.name || '');
			setLabels(data.labels || []);
			set_task_class(data.task_class?.id || undefined);
		}
	}, [data]);

	const saveButtonHandler = () => {
		const newData = {
			...data,
			id: data?.id,
			name,
			task_class,
		};
		dispatch(projectsActions.update(newData));
	};

	return (
		<div className="project --scroll">
			<div className="project-edit --max">
				{isLoading ? (
					<div className="project-edit__wrapper --spiner">
						<Spinner />
					</div>
				) : (
					<div className="project-edit__wrapper --max">
						<div className="project-edit__input__label CustomFontRegular">Name*</div>
						<input
							className="project-edit__input"
							value={name}
							type="text"
							placeholder="Name"
							onChange={(value) => setName(value.target.value)}
						/>
						<div className="project-edit__input__label CustomFontRegular">Task Class</div>
						<Select
							size="small"
							value={task_class ?? null}
							onChange={(event) => set_task_class(Number(event.target.value))}
							displayEmpty
						>
							{taskClasses?.map((item: TTaskClassesProps) => (
								<MenuItem
									key={item.id}
									value={item.id}
									sx={{backgroundColor: item.id === task_class ? 'red' : '#000'}}
								>
									{item.name}
								</MenuItem>
							))}
						</Select>
						<div className="project-edit__input__label CustomFontRegular">Labels</div>
						<Labels
							labels={labels}
							setLabels={setLabels}
							labelTypes={
								taskClasses?.find((item) => item.id === task_class)?.selection_tools || []
							}
							project_id={data?.id}
						/>
					</div>
				)}
				<div className="project-edit__wrapper --line">
					<div onClick={saveButtonHandler} className="project-edit__button --save CustomFontMedium">
						Сохранить
					</div>
				</div>
			</div>
		</div>
	);
};

export default Project;

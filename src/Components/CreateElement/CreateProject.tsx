import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import './CreateElement.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {useDispatch} from 'react-redux';
import {projectsActions} from '../../Lib/Redux/Projects/Actions/ProjectsActions';
import Labels from './Labels/Labels';
import {
	Project,
	TCreateProject,
	TLabelProps,
	TTaskClassesProps,
} from '../../Lib/Redux/Projects/slice';
import {useStoreSelector} from '../../Lib/Hooks/useStoreSelector';
import {selectProjectCurrent} from '../../Lib/Redux/Projects/Selectors/selectProjectCurrent';
import Spinner from '../Spinner/Spinner';
import {selectTaskClasses} from '../../Lib/Redux/Projects/Selectors/selectTaskClasses';

type ICreateProjectProps = {
	id?: number;
	data: Project | undefined;
	cancalHandler: () => void;
	isVertical: boolean | undefined;
	okHandler?: (data: TCreateProject) => void;
};

const CreateProject = (props: ICreateProjectProps) => {
	const {data, cancalHandler, isVertical} = props;
	const {isLoading, data: getData} = useStoreSelector(selectProjectCurrent);
	const taskClasses = useStoreSelector(selectTaskClasses);
	const [name, setName] = useState<string>(data?.name || '');
	const [task_class, set_task_class] = useState<number | undefined>(
		data?.task_class?.id || undefined,
	);
	const [labels, setLabels] = useState<TLabelProps[]>([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!_.isUndefined(props.id)) {
			dispatch(projectsActions.getById(data?.id));
		} else {
			dispatch(projectsActions.clearCurrent());
		}
	}, [data?.id]);

	useEffect(() => {
		if (!_.isUndefined(getData) && !_.isUndefined(props.id)) {
			setName(getData.name || '');
			setLabels(getData.labels || []);
			set_task_class(getData.task_class?.id || undefined);
		}
	}, [getData, props.id]);

	const title = _.isUndefined(data?.id) ? 'Create new Project' : null;

	const saveButtonHandler = () => {
		const newData = {
			...data,
			id: data?.id || getData?.id,
			name,
			task_class,
		};
		dispatch(
			_.isUndefined(data?.id)
				? projectsActions.create({name, labels, task_class})
				: projectsActions.update(newData),
		);
		props.okHandler && props.okHandler({...props.data, name, labels, task_class});
	};

	return (
		<>
			{title ? <div className="box-create__title CustomFontSemiBold">{title}</div> : null}
			<div className={`box-create ${isVertical && '--is-vertical'}`}>
				{isLoading ? (
					<div className="box-create__wrapper --spiner">
						<Spinner />
					</div>
				) : (
					<div className={`box-create__wrapper --scroll ${isVertical && '--margin --max'}`}>
						<div className="box-create__input__label CustomFontRegular">Name*</div>
						<input
							className={`box-create__input ${isVertical && '--max'}`}
							value={name}
							type="text"
							placeholder="Name"
							onChange={(value) => setName(value.target.value)}
						/>
						<div className="box-create__input__label CustomFontRegular">Task Class</div>
						<Select
							size="small"
							value={task_class}
							onChange={(event) => set_task_class(Number(event.target.value))}
							displayEmpty
						>
							{taskClasses?.map((item: TTaskClassesProps) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
						<div className="box-create__input__label CustomFontRegular">Labels</div>
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
				<div className={`box-create__wrapper --line ${isVertical && '--end'}`}>
					<div
						onClick={cancalHandler}
						className="box-create__button --default --margin CustomFontMedium"
					>
						Отменить
					</div>
					<div onClick={saveButtonHandler} className="box-create__button --save CustomFontMedium">
						Сохранить
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateProject;

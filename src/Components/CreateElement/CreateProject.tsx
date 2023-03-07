import React, {useState} from 'react';
import _ from 'lodash';

import './CreateElement.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {useDispatch} from 'react-redux';
import {projectsActions} from '../../Lib/Redux/Projects/Actions/ProjectsActions';
import Labels from './Labels/Labels';
import {TLabelProps} from '../../Lib/Redux/Projects/slice';

export type IProjectProps = {
	id?: number;
	name?: string;
	labels?: TLabelProps[];
};

type ICreateProjectProps = {
	data: IProjectProps | null;
	cancalHandler: () => void;
	isVertical: boolean | undefined;
	okHandler?: (data: IProjectProps) => void;
};

const CreateProject = (props: ICreateProjectProps) => {
	const {data, cancalHandler, isVertical} = props;
	const [name, setName] = useState<string>(data?.name || '');
	const [labels, setLabels] = useState<TLabelProps[]>([]);
	const dispatch = useDispatch();

	const title = _.isUndefined(data?.id) ? 'Create new Project' : null;

	const saveButtonHandler = () => {
		dispatch(
			_.isUndefined(data?.id)
				? projectsActions.create({name, labels})
				: projectsActions.update({...data, id: data?.id, name, labels}),
		);
		props.okHandler && props.okHandler({...props.data, name, labels});
	};

	return (
		<>
			{title ? <div className="box-create__title CustomFontSemiBold">{title}</div> : null}
			<div className={`box-create ${isVertical && '--is-vertical'}`}>
				<div className={`box-create__wrapper --scroll ${isVertical && '--margin --max'}`}>
					<div className="box-create__input__label CustomFontRegular">Name*</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={name}
						type="text"
						placeholder="Name"
						onChange={(value) => setName(value.target.value)}
					/>
					<div className="box-create__input__label CustomFontRegular">Labels</div>
					<Labels labels={labels} setLabels={setLabels} />
				</div>
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

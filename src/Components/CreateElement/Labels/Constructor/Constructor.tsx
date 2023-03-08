import React, {ChangeEvent, useCallback, useState} from 'react';
import _ from 'lodash';
import FormControl from '@mui/material/FormControl';
import {TextField, Button, Autocomplete, IconButton, Alert} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import './Constructor.scss';
import '../../../../UIKit/Theme/Styles/_fonts_global.scss';
import ColorPicker from '../../../ColorPicker/ColorPicker';
import Attribute from './Attribute/Attribute';
import {TAttributeProps, TLabelProps, TYPE_INPUT} from '../../../../Lib/Redux/Projects/slice';
import {useDispatch} from 'react-redux';
import {projectsActions} from '../../../../Lib/Redux/Projects/Actions/ProjectsActions';

type TConstructorProps = {
	data: TLabelProps[];
	setData: (data: TLabelProps[]) => void;
	labelTypes: string[];
	project_id: number | undefined;
};

const Constructor = (props: TConstructorProps) => {
	const dispatch = useDispatch();
	const [isColorPicker, setIsColorPicker] = useState(false);
	const [indexEdit, setIndexEdit] = useState<number | undefined>(undefined);
	const [editLabel, setEditLabel] = useState<TLabelProps | undefined>(undefined);
	const [isError, setIsError] = useState(false);
	const {data, setData, labelTypes, project_id} = props;

	const openColorPicker = () => setIsColorPicker(true);
	const cancelColorPicker = () => setIsColorPicker(false);
	const saveColor = useCallback(
		(color: string) => {
			cancelColorPicker();
			setEditLabel({name: '', selection_tools: [], ...editLabel, color: color});
		},
		[cancelColorPicker, setEditLabel, editLabel],
	);

	const nameChange = useCallback(
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setEditLabel({selection_tools: [], ...editLabel, name: event.target.value});
		},
		[setEditLabel, editLabel],
	);

	const typeChange = useCallback(
		(data: string[]) => {
			setEditLabel({name: '', ...editLabel, selection_tools: data});
		},
		[setEditLabel, editLabel],
	);

	const editItem = useCallback(
		(index: number) => {
			setIndexEdit(index);
			setEditLabel(structuredClone(data[index]));
		},
		[setIndexEdit, setEditLabel, data],
	);

	const cancelEditItem = useCallback(() => {
		setIndexEdit(undefined);
		setEditLabel(undefined);
	}, [setIndexEdit, setEditLabel]);

	const addEditItem = useCallback(() => {
		setIndexEdit(undefined);
		setEditLabel({project: project_id, name: '', selection_tools: [labelTypes[0]], color: '#000'});
	}, [setIndexEdit, setEditLabel, labelTypes, project_id]);

	const addAttribute = useCallback(() => {
		const attributes = editLabel?.attributes || [];
		attributes.push({
			name: '',
			input_type: TYPE_INPUT.SELECT,
			mutable: false,
			values: [],
			default_value: '',
		});
		setEditLabel({name: '', selection_tools: [], ...editLabel, attributes});
	}, [setEditLabel, editLabel]);

	const deleteAttribute = useCallback(
		(index: number) => {
			const attributes = editLabel?.attributes || [];
			attributes.splice(index, 1);
			setEditLabel({name: '', selection_tools: [], ...editLabel, attributes});
		},
		[setEditLabel, editLabel],
	);

	const attributeChange = useCallback(
		(index: number, data: TAttributeProps) => {
			const attributes = editLabel?.attributes || [];
			attributes[index] = data;
			setEditLabel({name: '', selection_tools: [], ...editLabel, attributes});
		},
		[setEditLabel, editLabel],
	);

	const deleteItem = useCallback(
		(index: number) => {
			if (indexEdit === index) {
				cancelEditItem();
			}
			const newData = [...data];
			newData.splice(index, 1);
			setData([...newData]);
			if (!_.isUndefined(project_id) && !_.isUndefined(data[index].id)) {
				// TODO: delete label to project
				dispatch(projectsActions.deleteLabel({id: data[index].id, project_id}));
			}
		},
		[setData, data, cancelEditItem, indexEdit],
	);

	const saveEditItem = useCallback(() => {
		const newData = [...data];
		if (editLabel?.name === '' || editLabel?.selection_tools.length === 0) {
			setIsError(true);
			return;
		}
		if (
			editLabel?.attributes &&
			editLabel?.attributes.length > 0 &&
			editLabel?.attributes.some((item) => item.name.length === 0)
		) {
			setIsError(true);
			return;
		}
		setIsError(false);
		if (_.isUndefined(indexEdit)) {
			newData.push(editLabel as TLabelProps);
			if (!_.isUndefined(project_id)) {
				// TODO: add new label to project
				dispatch(projectsActions.createLabel({data: editLabel as TLabelProps, project_id}));
			}
		} else {
			newData[indexEdit] = editLabel as TLabelProps;
			if (!_.isUndefined(project_id)) {
				// TODO: put label to project
				dispatch(projectsActions.updateLabel({data: editLabel as TLabelProps, project_id}));
			}
		}
		setData([...newData]);
		cancelEditItem();
	}, [indexEdit, cancelEditItem, editLabel, setData, data]);

	return (
		<div className="constructor">
			<div className="constructor__list">
				{_.isUndefined(editLabel) && (
					<Button
						onClick={addEditItem}
						sx={{height: 28, marginRight: 1}}
						size="small"
						variant="outlined"
					>
						+ add
					</Button>
				)}
				{data?.map((item, index) => (
					<div
						className={`constructor__list__item ${indexEdit === index && '--active'}`}
						key={index}
					>
						<div className="constructor__list__item__name">{item.name}</div>
						<IconButton size="small" onClick={() => editItem(index)}>
							<EditIcon sx={{width: 18}} />
						</IconButton>
						<IconButton size="small" onClick={() => deleteItem(index)}>
							<DeleteIcon sx={{width: 18}} />
						</IconButton>
					</div>
				))}
			</div>

			{!_.isUndefined(editLabel) && (
				<>
					<div className="constructor__edit">
						<FormControl sx={{m: 1, width: '40%'}}>
							<TextField
								value={editLabel.name}
								onChange={nameChange}
								size="small"
								required
								id="outlined-required"
								placeholder="Name*"
							/>
						</FormControl>
						<FormControl sx={{m: 1, width: '30%'}}>
							<Autocomplete
								size="small"
								value={editLabel.selection_tools}
								onChange={(e, v) => typeChange([...v])}
								multiple
								limitTags={2}
								id="multiple-limit-tags"
								options={labelTypes}
								getOptionLabel={(option) => option}
								renderInput={(params) => <TextField {...params} placeholder="Types*" />}
							/>
						</FormControl>
						<FormControl sx={{m: 1, width: '10%'}}>
							<Button onClick={openColorPicker} size="small" variant="outlined">
								<div style={{backgroundColor: editLabel.color}} className="color" />
							</Button>
						</FormControl>
						{isColorPicker && (
							<ColorPicker
								cancelColorPicker={cancelColorPicker}
								saveColor={saveColor}
								colorDefault={editLabel.color}
							/>
						)}
						<FormControl sx={{m: 1, minWidth: 180}}>
							<Button onClick={addAttribute} size="small" variant="outlined">
								Add an attribute +
							</Button>
						</FormControl>
					</div>
					<div className="constructor__attributes">
						{editLabel.attributes?.map((attribute, index) => (
							<Attribute
								key={index}
								attribute={attribute}
								setAttribute={(data) => attributeChange(index, data)}
								deleteAttribute={() => deleteAttribute(index)}
							/>
						))}
					</div>
					<div className="constructor__error">
						{isError && (
							<Alert severity="error">Please fill in all the required fields and try again</Alert>
						)}
					</div>
					<div className="constructor__bottom">
						<Button onClick={saveEditItem} sx={{marginRight: 2}} size="small" variant="contained">
							Save
						</Button>
						<Button onClick={cancelEditItem} size="small" variant="outlined">
							Cancel
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default Constructor;

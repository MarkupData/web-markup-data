import React, {ChangeEvent, useCallback, useState} from 'react';
import _ from 'lodash';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {TextField, Button, Autocomplete, IconButton, Alert} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import './Constructor.scss';
import '../../../../UIKit/Theme/Styles/_fonts_global.scss';
import ColorPicker from '../../../ColorPicker/ColorPicker';
import InputTags from '../../../InputTags/InputTags';
import Attribute from './Attribute/Attribute';
import {TAttributeProps, TLabelProps} from '../../../../Lib/Redux/Projects/slice';

type TConstructorProps = {
	data: TLabelProps[];
	setData: (data: TLabelProps[]) => void;
};

const SELECT_TOOLS = [
	'any',
	'text',
	'number',
	'date',
	'datetime',
	'time',
	'checkbox',
	'radio',
	'select',
	'textarea',
	'file',
	'image',
];

enum TYPE_INPUT {
	SELECT = 'select',
	CHECKBOX = 'checkbox',
	RADIO = 'radio',
	TEXT = 'text',
	NUMBER = 'number',
}

const Constructor = (props: TConstructorProps) => {
	const [isColorPicker, setIsColorPicker] = useState(false);
	const [indexEdit, setIndexEdit] = useState<number | undefined>(undefined);
	const [editLabel, setEditLabel] = useState<TLabelProps | undefined>(undefined);
	const [isError, setIsError] = useState(false);
	const {data, setData} = props;

	const openColorPicker = () => setIsColorPicker(true);
	const cancelColorPicker = () => setIsColorPicker(false);
	const saveColor = useCallback(
		(color: string) => {
			cancelColorPicker();
			setEditLabel({name: '', type: [], ...editLabel, color: color});
		},
		[cancelColorPicker, setEditLabel, editLabel],
	);

	const nameChange = useCallback(
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setEditLabel({type: [], ...editLabel, name: event.target.value});
		},
		[setEditLabel, editLabel],
	);

	const typeChange = useCallback(
		(data: string[]) => {
			setEditLabel({name: '', ...editLabel, type: data});
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
		setEditLabel({name: '', type: ['any'], color: '#000'});
	}, [setIndexEdit, setEditLabel]);

	const addAttribute = useCallback(() => {
		const attributes = editLabel?.attributes || [];
		attributes.push({
			name: '',
			input_type: TYPE_INPUT.SELECT,
			mutable: false,
			values: [],
			default_value: '',
		});
		setEditLabel({name: '', type: [], ...editLabel, attributes});
	}, [setEditLabel, editLabel]);

	const deleteAttribute = useCallback(
		(index: number) => {
			const attributes = editLabel?.attributes || [];
			attributes.splice(index, 1);
			setEditLabel({name: '', type: [], ...editLabel, attributes});
		},
		[setEditLabel, editLabel],
	);

	const attributeChange = useCallback(
		(index: number, data: TAttributeProps) => {
			const attributes = editLabel?.attributes || [];
			attributes[index] = data;
			setEditLabel({name: '', type: [], ...editLabel, attributes});
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
		},
		[setData, data, cancelEditItem, indexEdit],
	);

	const saveEditItem = useCallback(() => {
		const newData = [...data];
		if (editLabel?.name === '' || editLabel?.type.length === 0) {
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
		} else {
			newData[indexEdit] = editLabel as TLabelProps;
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
								value={editLabel.type}
								onChange={(e, v) => typeChange([...v])}
								multiple
								limitTags={2}
								id="multiple-limit-tags"
								options={SELECT_TOOLS}
								getOptionLabel={(option) => option}
								defaultValue={[SELECT_TOOLS[0]]}
								renderInput={(params) => <TextField {...params} placeholder="Types" />}
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

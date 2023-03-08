import React, {ChangeEvent, useCallback} from 'react';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {TextField, Button, Checkbox, FormControlLabel} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './Attribute.scss';
import '../../../../../UIKit/Theme/Styles/_fonts_global.scss';
import InputTags from '../../../../InputTags/InputTags';
import {TAttributeProps} from '../../../../../Lib/Redux/Projects/slice';

enum TYPE_INPUT {
	SELECT = 'select',
	CHECKBOX = 'checkbox',
	RADIO = 'radio',
	TEXT = 'text',
	NUMBER = 'number',
}

type TAttributeComponentProps = {
	attribute: TAttributeProps;
	setAttribute: (attribute: TAttributeProps) => void;
	deleteAttribute: () => void;
};

const Attribute = (props: TAttributeComponentProps) => {
	const {attribute, setAttribute, deleteAttribute} = props;

	const nameChange = useCallback(
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setAttribute({...attribute, name: event.target.value});
		},
		[attribute, setAttribute],
	);

	const typeChange = useCallback(
		(event: SelectChangeEvent) => {
			let values = attribute.values;
			if (TYPE_INPUT.TEXT === event.target.value || TYPE_INPUT.NUMBER === event.target.value) {
				values = [attribute.values.toString()];
			}
			if (TYPE_INPUT.CHECKBOX === event.target.value) {
				values = ['true'];
			}
			setAttribute({...attribute, input_type: event.target.value, values});
		},
		[setAttribute, attribute],
	);

	const valuesChange = useCallback(
		(data: string[]) => {
			setAttribute({...attribute, values: data});
		},
		[setAttribute, attribute],
	);

	return (
		<div className="constructor__attributes__item">
			<FormControl sx={{m: 1, width: '20%'}}>
				<TextField
					value={attribute.name}
					onChange={nameChange}
					size="small"
					required
					id="outlined-required"
					placeholder="Name*"
				/>
			</FormControl>
			<FormControl sx={{m: 1, width: '20%'}}>
				<Select size="small" value={attribute.input_type} onChange={typeChange} displayEmpty>
					{Object.values(TYPE_INPUT)?.map((item, index) => (
						<MenuItem key={index} value={item}>
							{item}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl sx={{m: 1, width: '20%', maxWidth: '20%'}}>
				{TYPE_INPUT.SELECT === attribute.input_type || TYPE_INPUT.RADIO === attribute.input_type ? (
					<InputTags tags={attribute.values} SetTags={valuesChange} />
				) : TYPE_INPUT.CHECKBOX === attribute.input_type ? (
					<Select
						size="small"
						value={attribute.values[0]}
						onChange={(e) => valuesChange([e.target.value])}
						displayEmpty
					>
						<MenuItem value="true">True</MenuItem>
						<MenuItem value="false">False</MenuItem>
					</Select>
				) : (
					<TextField
						value={attribute.values[0]}
						onChange={(e) => valuesChange([e.target.value])}
						size="small"
						required
						id="outlined-required"
						placeholder="Name*"
					/>
				)}
			</FormControl>
			<FormControl sx={{m: 1, marginLeft: 2}}>
				<FormControlLabel
					onChange={(e: React.SyntheticEvent, status: boolean) =>
						setAttribute({...attribute, mutable: status})
					}
					control={<Checkbox value={attribute.mutable} />}
					label="Mutable"
				/>
			</FormControl>
			<FormControl sx={{m: 1, marginLeft: 2}}>
				<Button onClick={deleteAttribute}>
					<DeleteForeverIcon />
				</Button>
			</FormControl>
		</div>
	);
};

export default Attribute;

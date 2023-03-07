import {Autocomplete, TextField} from '@mui/material';
import {Box} from '@mui/system';
import React, {useState} from 'react';

type TInputTags = {
	tags: string[];
	SetTags: (tags: string[]) => void;
};

export default function InputTags({tags, SetTags}: TInputTags) {
	const [val, SetVal] = useState<string>('');

	const handleOnDrag = (e: any) => {
		SetVal(e.target.value);
	};

	const handleOnKey = (e: any) => {
		if (val.length > 0 && e.key === 'Enter') {
			SetTags([...tags, val]);
			SetVal('');
			e.preventDefault();
		}
	};

	return (
		<Box sx={{flexGrow: 1}}>
			<Autocomplete
				onChange={(e, v) => SetTags([...v])}
				value={tags}
				size="small"
				freeSolo
				multiple
				id="multiple-limit-tags"
				options={[]}
				getOptionLabel={(option) => option}
				renderInput={(params) => {
					return (
						<TextField
							{...params}
							value={val}
							onKeyDown={(e) => handleOnKey(e)}
							onChange={handleOnDrag}
							placeholder="Values"
						/>
					);
				}}
				sx={{width: '200px'}}
			/>
		</Box>
	);
}

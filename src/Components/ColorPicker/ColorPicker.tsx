import React from 'react';
import _ from 'lodash';
import {Button} from '@mui/material';

import './ColorPicker.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {ColorPicker as ColorPickerMi, useColor, toColor} from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

type TColorPicker = {
	cancelColorPicker: () => void;
	saveColor: (color: string) => void;
	colorDefault?: string;
};

const COLORS = [
	'#000',
	'#ff0000',
	'#0000ff',
	'#00ff00',
	'#f0e13c',
	'#3cd1f0',
	'#9df03c',
	'#92958e',
	'#f5a54a',
];

const ColorPicker = (props: TColorPicker) => {
	const {cancelColorPicker, saveColor, colorDefault} = props;
	const [color, setColor] = useColor('hex', colorDefault || '#121212');

	return (
		<div className="color-picker">
			<ColorPickerMi
				width={240}
				height={90}
				color={color}
				onChange={setColor}
				hideHSV
				hideHEX
				hideRGB
				dark
			/>
			<div className="color-picker__items">
				{COLORS.map((item) => (
					<div
						onClick={() => setColor(toColor('hex', item))}
						key={item}
						style={{backgroundColor: item}}
						className="color-picker__el"
					/>
				))}
			</div>
			<Button
				onClick={() => saveColor(color.hex)}
				size="small"
				variant="contained"
				sx={{marginRight: 1}}
			>
				OK
			</Button>
			<Button onClick={cancelColorPicker} size="small" variant="outlined">
				Cancel
			</Button>
		</div>
	);
};

export default ColorPicker;

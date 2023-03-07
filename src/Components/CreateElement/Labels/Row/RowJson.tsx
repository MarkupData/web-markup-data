import React from 'react';
import _ from 'lodash';
import ReactJson from 'react-json-view';

import './Row.scss';
import '../../../../UIKit/Theme/Styles/_fonts_global.scss';
import {TLabelProps} from '../../../../Lib/Redux/Projects/slice';

type TConstructorProps = {
	data: TLabelProps[];
	setData: (data: TLabelProps[]) => void;
};

const RowJson = (props: TConstructorProps) => {
	const {data} = props;

	return (
		<div className="constructor">
			<div className="constructor__list">
				<ReactJson src={data} />
			</div>
		</div>
	);
};

export default RowJson;

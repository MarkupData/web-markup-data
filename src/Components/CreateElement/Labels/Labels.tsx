import React, {useCallback, useState} from 'react';

import './Labels.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import Constructor from './Constructor/Constructor';
import {Button, ButtonGroup} from '@mui/material';
import RowJson from './Row/RowJson';
import {TLabelProps} from '../../../Lib/Redux/Projects/slice';

export type IProjectProps = {
	id?: number;
	name?: string;
	address?: string;
};

enum LabelsMenu {
	ROW = 'ROW',
	CONSTRUCTOR = 'CONSTRUCTOR',
}

type TLabelsProps = {
	labels: TLabelProps[];
	setLabels: (labels: TLabelProps[]) => void;
	labelTypes: string[];
	project_id: number | undefined;
};

const Labels = ({labels, setLabels, labelTypes, project_id}: TLabelsProps) => {
	const [menu, setMenu] = useState<LabelsMenu>(LabelsMenu.CONSTRUCTOR);

	const rowHandler = () => setMenu(LabelsMenu.ROW);
	const constructorHandler = () => setMenu(LabelsMenu.CONSTRUCTOR);

	const switchMenu = useCallback(() => {
		switch (menu) {
			case LabelsMenu.ROW:
				return <RowJson data={labels} setData={setLabels} />;
			case LabelsMenu.CONSTRUCTOR:
				return (
					<Constructor
						data={labels}
						setData={setLabels}
						labelTypes={labelTypes}
						project_id={project_id}
					/>
				);
			default:
				return null;
		}
	}, [menu, labels, setLabels, labelTypes]);

	return (
		<div className="labels">
			<div className="labels__header">
				<ButtonGroup size="small" aria-label="small button group">
					<Button onClick={rowHandler} key="one">
						Json view
					</Button>
					<Button onClick={constructorHandler} key="two">
						Constructor
					</Button>
				</ButtonGroup>
			</div>
			{switchMenu()}
		</div>
	);
};

export default Labels;

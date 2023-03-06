import React from 'react';

import './TableList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import List from '../List';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {selectTablesList} from '../../../Lib/Redux/Tables/Selectors/selectTablesList';
import {Table} from '../../../Lib/Redux/Tables/slice';
import TableItem from './TableItem';

const TableList = () => {
	const tablesData = useStoreSelector(selectTablesList);

	const addButtonHandler = () => {};

	return (
		<List
			id={'list-tables'}
			label={'Tables'}
			labelAddButton={'Add table'}
			addButtonHandler={addButtonHandler}
		>
			{tablesData?.map((item: Table) => (
				<TableItem {...item} key={item.id} />
			))}
		</List>
	);
};

export default TableList;

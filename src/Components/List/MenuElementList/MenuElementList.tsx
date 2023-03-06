import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import './MenuElementList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import List from '../List';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {ElementMenuRoot} from '../../../Lib/Redux/MenuElements/slice';
import {selectMenuElementsList} from '../../../Lib/Redux/MenuElements/Selectors/selectMenuElementsList';
import MenuElementItem from './MenuElementItem';
import {popupActions} from '../../../Lib/Redux/Popup/Actions/PopupActions';
import CreateMenu from '../../CreateElement/CreateMenu';
import {menuElementsActions} from '../../../Lib/Redux/MenuElements/Actions/MenuElemetsActions';

const MenuElementList = () => {
	const menuElementsData = useStoreSelector(selectMenuElementsList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(menuElementsActions.getList());
	}, []);

	const addButtonHandler = useCallback(() => {
		dispatch(
			popupActions.open({
				children: (
					<CreateMenu
						data={null}
						cancalHandler={() => dispatch(popupActions.close())}
						isVertical={true}
					/>
				),
			}),
		);
	}, [popupActions.close]);

	const itemClickHandler = useCallback((item: ElementMenuRoot) => {
		dispatch(menuElementsActions.handler(item.id));
	}, []);

	return (
		<List
			id={'list-menu-element'}
			label={'Menus'}
			labelAddButton={'Add menu'}
			addButtonHandler={addButtonHandler}
		>
			{menuElementsData?.map((item: ElementMenuRoot) => (
				<MenuElementItem onHandlerClick={itemClickHandler} data={item} key={item.id} />
			))}
		</List>
	);
};

export default MenuElementList;

import React, {useState} from 'react';

import './Restaurant.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {useDispatch} from 'react-redux';
import {THomeContainerProps} from '../../../Containers/Home/HomeContainer';
import List from '../../List/List';
import MenuElements from '../MenuElements';
import {EnumItemsMenu} from '../../../Lib/Redux/Menu/slice';
import SwithCaseElements from './SwithCaseElements';
import CreateRestaurant from '../../CreateElement/CreateRestaurant';
import {ElementMenu} from '../../../Lib/Redux/MenuElements/slice';
import {Employee} from '../../../Lib/Redux/Employees/slice';
import {Table} from '../../../Lib/Redux/Tables/slice';
import {popupActions} from '../../../Lib/Redux/Popup/Actions/PopupActions';
import CreateMenu from '../../CreateElement/CreateMenu';
import CreateEmployee from '../../CreateElement/CreateEmployee';
import {selectRestaurantsCurrent} from '../../../Lib/Redux/Restaurants/Selectors/selectRestaurantsCurrent';
import {restaurantsActions} from '../../../Lib/Redux/Restaurants/Actions/RestaurantsActions';
import {menuElementsActions} from '../../../Lib/Redux/MenuElements/Actions/MenuElemetsActions';
import {selectMenuItemCurrentList} from '../../../Lib/Redux/Restaurants/Selectors/selectMenuItemCurrentList';

const menuList = [
	{
		label: 'Menu',
		value: EnumItemsMenu.MENU,
	},
	{
		label: 'Employees',
		value: EnumItemsMenu.EMPLOYEES,
	},
	{
		label: 'Tables & QR-Code',
		value: EnumItemsMenu.TABLE_QR,
	},
];

const Restaurant = (props: THomeContainerProps) => {
	const {data, isLoading} = useStoreSelector(selectRestaurantsCurrent);
	const activeMenu = useStoreSelector(selectMenuItemCurrentList);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const dispatch = useDispatch();

	const editRestaurantData = {
		id: data?.id,
		name: data?.name,
		address: data?.address,
	};

	const addButtonHandler = () => {
		// Add Menu/Employee/Table
		switch (activeMenu) {
			case EnumItemsMenu.MENU:
				dispatch(
					popupActions.open({
						children: (
							<CreateMenu
								data={{restaurant_ids: [data?.id]}}
								cancalHandler={() => dispatch(popupActions.close())}
								isVertical={true}
							/>
						),
					}),
				);
				break;
			case EnumItemsMenu.EMPLOYEES:
				dispatch(
					popupActions.open({
						children: (
							<CreateEmployee
								data={{restaurant_id: data?.id}}
								cancalHandler={() => dispatch(popupActions.close())}
								isVertical={true}
							/>
						),
					}),
				);
				break;
			case EnumItemsMenu.TABLE_QR:
				// View Table
				// dispatch(
				// 	menuActions.handler({
				// 		address: `${EnumItemsMenu.MENU}>${EnumNestedAddresses.ELEMENT}>${data_str}`,
				// 	}),
				// );
				break;

			default:
				break;
		}
	};

	const itemMenuHandler = (value: EnumItemsMenu) => {
		switch (value) {
			case EnumItemsMenu.MENU:
				dispatch(restaurantsActions.getMenuListToCurrent());
				break;
			case EnumItemsMenu.EMPLOYEES:
				dispatch(restaurantsActions.getEmployeeListToCurrent());
				break;
			case EnumItemsMenu.TABLE_QR:
				dispatch(restaurantsActions.getTableListToCurrent());
				break;
			default:
				break;
		}
	};

	const editButtonHandler = () => {
		setIsEdit(!isEdit);
	};

	const deleteButtonHandler = () => {
		dispatch(restaurantsActions.delete(editRestaurantData?.id));
	};

	const itemElemetHandler = (type: EnumItemsMenu, data: ElementMenu | Employee | Table) => {
		const data_str = JSON.stringify(data);
		switch (type) {
			case EnumItemsMenu.MENU:
				dispatch(menuElementsActions.handler(data.id));
				break;
			case EnumItemsMenu.EMPLOYEES:
				dispatch(
					popupActions.open({
						children: (
							<CreateEmployee
								data={data}
								okHandler={() => dispatch(popupActions.close())}
								cancalHandler={() => dispatch(popupActions.close())}
								isVertical={true}
							/>
						),
					}),
				);
				break;
			case EnumItemsMenu.TABLE_QR:
				// View Table
				// dispatch(
				// 	menuActions.handler({
				// 		address: `${EnumItemsMenu.MENU}>${EnumNestedAddresses.ELEMENT}>${data_str}`,
				// 	}),
				// );
				break;

			default:
				break;
		}
	};

	return (
		<div className="restaurant">
			<div className="restaurant__data">
				{isEdit ? (
					<CreateRestaurant
						data={editRestaurantData}
						cancalHandler={editButtonHandler}
						okHandler={editButtonHandler}
						isVertical={false}
					/>
				) : (
					<>
						<div className="restaurant__data__wrapper">
							<div className="restaurant__data__name CustomFontBold">{data?.name}</div>
							<div className="restaurant__data__address CustomFontRegular">{data?.address}</div>
						</div>
						<div className="restaurant__data__wrapper --line">
							<div
								onClick={deleteButtonHandler}
								className="restaurant__data__button --delete --margin CustomFontMedium"
							>
								Удалить
							</div>
							<div
								onClick={editButtonHandler}
								className="restaurant__data__button --edit CustomFontMedium"
							>
								Редактировать
							</div>
						</div>
					</>
				)}
			</div>

			<div className="restaurant__elements-list">
				<List
					id={'list-menu-element'}
					label={'Menus'}
					labelAddButton={`Add ${activeMenu}`}
					addButtonHandler={addButtonHandler}
					header={
						<MenuElements onChange={itemMenuHandler} listItem={menuList} activeItem={activeMenu} />
					}
				>
					<SwithCaseElements
						itemHandler={itemElemetHandler}
						value={activeMenu}
						menus={data?.menus}
						employees={data?.employees}
						tables={data?.tables}
					/>
				</List>
			</div>
		</div>
	);
};

export default Restaurant;

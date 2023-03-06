import React, {useState} from 'react';

import './Menu.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {useDispatch} from 'react-redux';
import {THomeContainerProps} from '../../../Containers/Home/HomeContainer';
import List from '../../List/List';
import CreateMenu, {IMenuProps} from '../../CreateElement/CreateMenu';
import DishItem from '../../List/DishList/DishItem';
import {Dish} from '../../../Lib/Redux/Dishes/slice';
import {popupActions} from '../../../Lib/Redux/Popup/Actions/PopupActions';
import CreateDish from '../../CreateElement/CreateDish';
import {selectMenuElementCurrent} from '../../../Lib/Redux/MenuElements/Selectors/selectMenuElementCurrent';
import {menuElementsActions} from '../../../Lib/Redux/MenuElements/Actions/MenuElemetsActions';

const Menu = (props: THomeContainerProps) => {
	const {data, isLoading} = useStoreSelector(selectMenuElementCurrent);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const dispatch = useDispatch();

	const editMenuData = {
		id: data?.id,
		name: data?.name,
		restaurant_ids: data?.restaurant_ids,
	};

	const addButtonHandler = () => {
		dispatch(
			popupActions.open({
				children: (
					<CreateDish
						data={{menu_ids: [data?.id]}}
						cancalHandler={() => dispatch(popupActions.close())}
						isVertical={true}
					/>
				),
			}),
		);
	};

	const editDishHandler = (data: Dish) => {
		dispatch(
			popupActions.open({
				children: (
					<CreateDish
						data={data}
						cancalHandler={() => dispatch(popupActions.close())}
						isVertical={true}
					/>
				),
			}),
		);
	};

	const editButtonHandler = () => {
		setIsEdit(!isEdit);
	};

	const editMenuHandler = (data: IMenuProps) => {
		editButtonHandler();
	};

	const deleteButtonHandler = () => {
		dispatch(menuElementsActions.delete(editMenuData?.id));
	};

	return (
		<div className="restaurant">
			<div className="restaurant__data">
				{isEdit ? (
					<CreateMenu
						data={editMenuData}
						okHandler={editMenuHandler}
						cancalHandler={editButtonHandler}
						isVertical={false}
					/>
				) : (
					<>
						<div className="restaurant__data__wrapper">
							<div className="restaurant__data__name CustomFontBold">{data?.name}</div>
							{/* <div className="restaurant__data__address CustomFontRegular">
								{data?.description}
							</div> */}
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
					labelAddButton={'Add dish'}
					addButtonHandler={addButtonHandler}
					label={'Dishes'}
				>
					{data?.dishes?.data?.map((item: Dish) => (
						<DishItem onHandlerClick={editDishHandler} key={item.id} data={item} />
					))}
				</List>
			</div>
		</div>
	);
};

export default Menu;

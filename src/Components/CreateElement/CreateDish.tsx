import React, {useState, useEffect} from 'react';
import _ from 'lodash';

import './CreateElement.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import SelectMultiple from '../../UIKit/Elemets/SelectMultiple/SelectMultiple';
import {useStoreSelector} from '../../Lib/Hooks/useStoreSelector';
import {useDispatch} from 'react-redux';

export type IDishProps = {
	id?: number;
	name?: string;
	price?: string;
	menu_ids?: number[];
};

type ICreateDishProps = {
	data: IDishProps | null;
	okHandler?: (data: IDishProps) => void;
	cancalHandler: () => void;
	isVertical: boolean | undefined;
};

const CreateDish = (props: ICreateDishProps) => {
	// const menusData = useStoreSelector(selectMenuElementsState);
	const dispatch = useDispatch();
	const {data, cancalHandler, isVertical} = props;
	const [name, setName] = useState<string>(data?.name || '');
	const [price, setPrice] = useState<string>(data?.price || '');
	const [menu_ids, setMenus_ids] = useState<number[]>(data?.menu_ids || []);

	const select_menu_ids = [...menu_ids];

	const saveButtonHandler = () => {
		// dispatch(
		// 	_.isUndefined(data?.id)
		// 		? dishesActions.create({name, price, menu_ids})
		// 		: dishesActions.update({...data, price, name, menu_ids}),
		// );
		props.okHandler && props.okHandler({...props.data, name, menu_ids});
	};

	useEffect(() => {
		// dispatch(menuElementsActions.getList());
	}, []);

	const title = _.isUndefined(data?.id) ? 'Create employee' : null;

	return (
		<>
			{title ? <div className="box-create__title CustomFontSemiBold">{title}</div> : null}
			<div className={`box-create ${isVertical && '--is-vertical'}`}>
				<div className={`box-create__wrapper ${isVertical && '--margin --max'}`}>
					<div className="box-create__input__label CustomFontRegular">Name dish</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={name}
						type="text"
						placeholder="Name"
						onChange={(value) => setName(value.target.value)}
					/>
					<div className="box-create__input__label CustomFontRegular">Price dish</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={price}
						type="text"
						placeholder="Price"
						onChange={(value) => setPrice(value.target.value)}
					/>
					<div className="box-create__input__label CustomFontRegular">Select menus:</div>
					{/* <SelectMultiple
						data_list={menusData.data}
						list_value={'id'}
						list_label={'name'}
						onChange={setMenus_ids}
						curent_value={select_menu_ids}
						isLoading={menusData.isLoading}
					/> */}
				</div>
				<div className={`box-create__wrapper --line ${isVertical && '--end'}`}>
					<div
						onClick={cancalHandler}
						className="box-create__button --default --margin CustomFontMedium"
					>
						Отменить
					</div>
					<div onClick={saveButtonHandler} className="box-create__button --save CustomFontMedium">
						Сохранить
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateDish;

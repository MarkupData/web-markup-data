import React, {useState, useEffect} from 'react';
import _ from 'lodash';

import './CreateElement.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import SelectMultiple from '../../UIKit/Elemets/SelectMultiple/SelectMultiple';
import {useStoreSelector} from '../../Lib/Hooks/useStoreSelector';
import {useDispatch} from 'react-redux';

export type IMenuProps = {
	id?: number;
	name?: string;
	descrition?: string;
	restaurant_ids?: number[];
};

type ICreateMenuProps = {
	data: IMenuProps | null;
	okHandler?: (data: IMenuProps) => void;
	cancalHandler: () => void;
	isVertical: boolean | undefined;
};

const CreateMenu = (props: ICreateMenuProps) => {
	// const restaurantsData = useStoreSelector(selectRestaurantsState);
	const dispatch = useDispatch();
	const {data, cancalHandler, isVertical} = props;
	const [name, setName] = useState<string>(data?.name || '');
	// const [descrition, setDescrition] = useState<string>(data?.descrition || '');
	const [restaurant_ids, setRestaurant_ids] = useState<number[]>(data?.restaurant_ids || []);

	const saveButtonHandler = () => {
		// dispatch(
		// 	_.isUndefined(data?.id)
		// 		? menuElementsActions.create({...props.data, name, restaurant_ids})
		// 		: menuElementsActions.update({...props.data, name, restaurant_ids}),
		// );
		props.okHandler && props.okHandler({...props.data, name, restaurant_ids});
	};

	useEffect(() => {
		// dispatch(restaurantsActions.getList());
	}, []);

	const title = _.isUndefined(data?.id) ? 'Create menu' : null;

	return (
		<>
			{title ? <div className="box-create__title CustomFontSemiBold">{title}</div> : null}
			<div className={`box-create ${isVertical && '--is-vertical'}`}>
				<div className={`box-create__wrapper ${isVertical && '--margin --max'}`}>
					<div className="box-create__input__label CustomFontRegular">Name menu</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={name}
						type="text"
						placeholder="Name"
						onChange={(value) => setName(value.target.value)}
					/>
					{/* <div className="box-create__input__label CustomFontRegular">Descrition menu</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={descrition}
						type="text"
						placeholder="Descrition"
						onChange={(value) => setDescrition(value.target.value)}
					/> */}
					<div className="box-create__input__label CustomFontRegular">Select restaurants:</div>
					{/* <SelectMultiple
						data_list={restaurantsData.data}
						list_value={'id'}
						list_label={'name'}
						onChange={setRestaurant_ids}
						curent_value={restaurant_ids}
						isLoading={restaurantsData.isLoading}
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

export default CreateMenu;

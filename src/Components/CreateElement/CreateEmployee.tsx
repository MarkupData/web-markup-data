import React, {useState, useEffect} from 'react';
import _ from 'lodash';

import './CreateElement.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import SelectOne from '../../UIKit/Elemets/SelectMultiple/SelectOne';
import {useStoreSelector} from '../../Lib/Hooks/useStoreSelector';
import {selectRestaurantsState} from '../../Lib/Redux/Restaurants/Selectors/selectRestaurantsState';
import {restaurantsActions} from '../../Lib/Redux/Restaurants/Actions/RestaurantsActions';
import {useDispatch} from 'react-redux';
import {employeesActions} from '../../Lib/Redux/Employees/Actions/EmployeesActions';

export type IEmployeeProps = {
	id?: number;
	name?: string;
	type?: string | null;
	restaurant_id?: number | null;
};

type ICreateEmployeeProps = {
	data: IEmployeeProps | null;
	okHandler?: (data: IEmployeeProps) => void;
	cancalHandler: () => void;
	isVertical: boolean | undefined;
};

const CreateEmployee = (props: ICreateEmployeeProps) => {
	const restaurantsData = useStoreSelector(selectRestaurantsState);
	const dispatch = useDispatch();
	const {data, cancalHandler, isVertical} = props;
	const [name, setName] = useState<string>(data?.name || '');
	const [type, setType] = useState(data?.type || '');
	const [restaurant_id, setRestaurant_id] = useState(data?.restaurant_id || null);

	const saveButtonHandler = () => {
		dispatch(
			_.isUndefined(data?.id)
				? employeesActions.create({...props.data, name, type, restaurant_id})
				: employeesActions.update({...props.data, name, type, restaurant_id}),
		);
		props.okHandler && props.okHandler({...props.data, name, type, restaurant_id});
	};

	useEffect(() => {
		dispatch(restaurantsActions.getList());
	}, []);

	const title = _.isUndefined(data?.id) ? 'Create employee' : null;

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
					<div className="box-create__input__label CustomFontRegular">Select type:</div>
					<SelectOne
						data_list={[
							{value: 'cook', label: 'cook'},
							{value: 'waiter', label: 'waiter'},
						]}
						list_value={'value'}
						list_label={'label'}
						onChange={setType}
						curent_value={type}
					/>
					<div className="box-create__input__label CustomFontRegular">Select restaurant:</div>
					<SelectOne
						data_list={restaurantsData.data}
						list_value={'id'}
						list_label={'name'}
						onChange={setRestaurant_id}
						curent_value={restaurant_id}
						isLoading={restaurantsData.isLoading}
					/>
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

export default CreateEmployee;

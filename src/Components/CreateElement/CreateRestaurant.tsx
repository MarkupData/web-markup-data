import React, {useState} from 'react';
import _ from 'lodash';

import './CreateElement.scss';
import '../../UIKit/Theme/Styles/_fonts_global.scss';
import {useDispatch} from 'react-redux';
import {restaurantsActions} from '../../Lib/Redux/Restaurants/Actions/RestaurantsActions';

export type IRestaurantProps = {
	id?: number;
	name?: string;
	address?: string;
};

type ICreateRestaurantProps = {
	data: IRestaurantProps | null;
	cancalHandler: () => void;
	isVertical: boolean | undefined;
	okHandler?: (data: IRestaurantProps) => void;
};

const CreateRestaurant = (props: ICreateRestaurantProps) => {
	const {data, cancalHandler, isVertical} = props;
	const [name, setName] = useState<string>(data?.name || '');
	const [address, setAddress] = useState<string>(data?.address || '');
	const dispatch = useDispatch();

	const title = _.isUndefined(data?.id) ? 'Create restaurant' : null;

	const saveButtonHandler = () => {
		dispatch(
			_.isUndefined(data?.id)
				? restaurantsActions.create({name, address})
				: restaurantsActions.update({...data, id: data?.id, name, address}),
		);
		props.okHandler && props.okHandler({...props.data, name, address});
	};

	return (
		<>
			{title ? <div className="box-create__title CustomFontSemiBold">{title}</div> : null}
			<div className={`box-create ${isVertical && '--is-vertical'}`}>
				<div className={`box-create__wrapper ${isVertical && '--margin --max'}`}>
					<div className="box-create__input__label CustomFontRegular">Name restaurant</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={name}
						type="text"
						placeholder="Name"
						onChange={(value) => setName(value.target.value)}
					/>
					<div className="box-create__input__label CustomFontRegular">Address restaurant</div>
					<input
						className={`box-create__input ${isVertical && '--max'}`}
						value={address}
						type="text"
						placeholder="Address"
						onChange={(value) => setAddress(value.target.value)}
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

export default CreateRestaurant;

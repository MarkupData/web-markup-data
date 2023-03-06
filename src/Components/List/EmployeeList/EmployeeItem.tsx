import React from 'react';

import './EmployeeList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import {Employee} from '../../../Lib/Redux/Employees/slice';

type IEmployeeListProps = {
	data: Employee;
	onHandlerClick: (value: Employee) => void;
};

const EmployeeItem = (props: IEmployeeListProps) => {
	const {data, onHandlerClick} = props;
	console.log(
		'`http://127.0.0.1/admin/restaurants_admin/waiterprofile/${data?.id}/delete/`-',
		`http://127.0.0.1/admin/restaurants_admin/waiterprofile/${data?.id}/delete/`,
	);
	return (
		<a
			href={`http://127.0.0.1/admin/restaurants_admin/waiterprofile/${data?.id}/change/`}
			// onClick={() => onHandlerClick(data)}
			className="employee-list__item"
		>
			<div key={data.id} className="employee-list__item_container">
				<div className="employee-list__item__name_alfabet CustomFontMedium">
					{data.name.charAt(0)}
				</div>
				<div className="employee-list__item__wrapper">
					<div className="employee-list__item__name CustomFontSemiBold">{data.name}</div>
					{/* <div className="employee-list__item__date CustomFontRegular">{item.name}</div> */}
				</div>
				{/* <div className="employee-list__item__onlian_true CustomFontRegular">
							<div className="employee-list__item__block_onlian_true" />
							Online
						</div> */}
			</div>
			<a
				href={`http://127.0.0.1/admin/restaurants_admin/waiterprofile/${data?.id}/delete/`}
				className="employee-list__item__button CustomFontSemiBold"
			>
				Delete employee
			</a>
		</a>
	);
};

export default EmployeeItem;

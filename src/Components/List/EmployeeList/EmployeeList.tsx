import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import './EmployeeList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import {Employee, EnumTypeEmployees} from '../../../Lib/Redux/Employees/slice';
import List from '../List';
import {useStoreSelector} from '../../../Lib/Hooks/useStoreSelector';
import {selectEmployeesType} from '../../../Lib/Redux/Employees/Selectors/selectEmployeesType';
import EmployeeItem from './EmployeeItem';
import {popupActions} from '../../../Lib/Redux/Popup/Actions/PopupActions';
import CreateEmployee from '../../CreateElement/CreateEmployee';
import {employeesActions} from '../../../Lib/Redux/Employees/Actions/EmployeesActions';

type TEmployeeList = {
	typeList: EnumTypeEmployees;
};

const EmployeeList = (props: TEmployeeList) => {
	const {typeList} = props;
	const employeesData = useStoreSelector(selectEmployeesType, {type: typeList});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(employeesActions.getList());
	}, []);

	const itemClickHandler = useCallback(
		(data: Employee | null = null) => {
			// dispatch(
			// 	popupActions.open({
			// 		children: (
			// 			<CreateEmployee
			// 				data={data}
			// 				cancalHandler={() => dispatch(popupActions.close())}
			// 				isVertical={true}
			// 			/>
			// 		),
			// 	}),
			// );
		},
		[popupActions.close],
	);

	return (
		<List
			id={typeList}
			label={typeList === EnumTypeEmployees.COOK ? 'Cook' : 'Waiter'}
			labelAddButton={typeList === EnumTypeEmployees.COOK ? 'Add Cook' : 'Add Waiter'}
			addButtonHandler={itemClickHandler}
			href={
				typeList === EnumTypeEmployees.WAITER
					? 'http://127.0.0.1/admin/restaurants_admin/waiterprofile/add/'
					: 'http://127.0.0.1/admin/restaurants_admin/cookprofile/add/'
			}
		>
			{employeesData?.map((item: Employee) => (
				<EmployeeItem onHandlerClick={itemClickHandler} data={item} key={item.id} />
			))}
		</List>
	);
};

export default EmployeeList;

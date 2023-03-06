import React from 'react';
import EmployeeList from '../../../Components/List/EmployeeList/EmployeeList';
import {EnumTypeEmployees} from '../../../Lib/Redux/Employees/slice';
import {THomeContainerProps} from '../../Home/HomeContainer';
import {EnumNestedAddresses} from '../type';

const EmployeeContainer = (props: THomeContainerProps) => {
	const menu_item = props.address.split('>')[1];

	switch (menu_item) {
		case EnumNestedAddresses.LIST:
			return (
				<>
					<div className="panel-container-wrapper">
						<EmployeeList typeList={EnumTypeEmployees.COOK} />
					</div>
					<div className="panel-container-wrapper">
						<EmployeeList typeList={EnumTypeEmployees.WAITER} />
					</div>
				</>
			);
		case EnumNestedAddresses.ELEMENT:
			return null;
		case EnumNestedAddresses.CREATE:
			return null;
		default:
			return null;
	}
};

export default EmployeeContainer;

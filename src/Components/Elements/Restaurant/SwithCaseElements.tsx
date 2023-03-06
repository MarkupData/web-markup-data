import React from 'react';
import {Employee, EmployeesType} from '../../../Lib/Redux/Employees/slice';
import {EnumItemsMenu} from '../../../Lib/Redux/Menu/slice';
import {
	ElementMenu,
	ElementMenuRoot,
	MenuElementsType,
} from '../../../Lib/Redux/MenuElements/slice';
import {Table, TablesType} from '../../../Lib/Redux/Tables/slice';
import EmployeeItem from '../../List/EmployeeList/EmployeeItem';
import MenuElementItem from '../../List/MenuElementList/MenuElementItem';
import TableItem from '../../List/TableList/TableItem';

type ISwithCaseElementsProps = {
	value: EnumItemsMenu;
	menus: MenuElementsType;
	employees: {data: EmployeesType};
	tables: TablesType;
	itemHandler: (type: EnumItemsMenu, data: ElementMenu | Employee | Table) => void;
};

const SwithCaseElements = (props: ISwithCaseElementsProps) => {
	const {value, menus, employees, tables, itemHandler} = props;

	const elementHandlerSwitch = (data: ElementMenu | Employee | Table) => {
		itemHandler(value, data);
	};

	switch (value) {
		case EnumItemsMenu.MENU:
			return (
				<>
					{menus?.data?.map((item: ElementMenuRoot) => (
						<MenuElementItem onHandlerClick={elementHandlerSwitch} data={item} key={item.id} />
					))}
				</>
			);
		case EnumItemsMenu.EMPLOYEES:
			return (
				<>
					{employees?.data?.cook?.map((item: Employee) => (
						<EmployeeItem onHandlerClick={elementHandlerSwitch} data={item} key={item.id} />
					))}
					{employees?.data?.waiter?.map((item: Employee) => (
						<EmployeeItem onHandlerClick={elementHandlerSwitch} data={item} key={item.id} />
					))}
				</>
			);
		case EnumItemsMenu.TABLE_QR:
			return (
				<>
					{tables?.data?.map((item: Table) => (
						<TableItem {...item} key={item.id} />
					))}
				</>
			);
		default:
			return null;
	}
};

export default SwithCaseElements;

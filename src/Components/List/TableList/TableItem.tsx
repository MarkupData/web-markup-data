import React from 'react';

import './TableList.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import {Table} from '../../../Lib/Redux/Tables/slice';

const TableItem = (props: Table) => {
	return (
		<div className="table-list__item">
			<div key={props.id} className="table-list__item_container">
				<div className="table-list__item__name_alfabet CustomFontMedium">
					{props.name.charAt(0)}
				</div>
				<div className="table-list__item__wrapper">
					<div className="table-list__item__name CustomFontSemiBold">{props.name}</div>
					{/* <div className="table-list__item__date CustomFontRegular">{item.name}</div> */}
				</div>
				{/* <div className="table-list__item__onlian_true CustomFontRegular">
					<div className="table-list__item__block_onlian_true" />
					Online
				</div> */}
			</div>
			<div className="table-list__item__wrapper_buttons">
				<div className="table-list__item__button_view_qr CustomFontSemiBold">Просмотр QR-кода</div>
				<div className="table-list__item__button_create_qr CustomFontSemiBold">
					Сгенерировать QR-кода
				</div>
			</div>
			<div className="table-list__item__wrapper_buttons">
				<div className="table-list__item__button_edit CustomFontSemiBold">Edit</div>
				<div className="table-list__item__button_delete CustomFontSemiBold">Delete</div>
			</div>
		</div>
	);
};

export default TableItem;

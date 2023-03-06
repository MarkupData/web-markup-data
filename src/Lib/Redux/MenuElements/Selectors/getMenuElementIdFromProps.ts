import IRootState from '../../IRootState';

type TPropsWithMenuElementId = {
	id: number;
};

export const getMenuElementIdFromProps = (_: IRootState, props: TPropsWithMenuElementId) =>
	props.id;

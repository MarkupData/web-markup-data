import IRootState from '../../IRootState';

type TPropsWithRestaurantId = {
	id: number;
};

export const getRestaurantIdFromProps = (_: IRootState, props: TPropsWithRestaurantId) => props.id;

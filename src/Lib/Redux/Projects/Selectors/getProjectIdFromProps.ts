import IRootState from '../../IRootState';

type TPropsWithProjectId = {
	id: number;
};

export const getProjectIdFromProps = (_: IRootState, props: TPropsWithProjectId) => props.id;

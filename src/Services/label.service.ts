import {ApiUrl} from '../const';
import {TCreateProject} from '../Lib/Redux/Projects/slice';
import {fetchWrapper} from '../Utils/fetch-wrapper';

export const labelService = {
	create,
	update,
	delete: _delete,
};

async function create(project_id: number, project: TCreateProject) {
	return fetchWrapper.post(`${ApiUrl}/projects/${project_id}/labels/`, project);
}

async function update(project_id: number, project: TCreateProject) {
	return fetchWrapper.put(`${ApiUrl}/projects/${project_id}/labels/${project.id}/`, project);
}

async function _delete(project_id: number, id: number) {
	return fetchWrapper.delete(`${ApiUrl}/projects/${project_id}/labels/${id}/`);
}

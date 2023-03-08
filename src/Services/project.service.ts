import {ApiUrl} from '../const';
import {Project} from '../Lib/Redux/Projects/slice';
import {fetchWrapper} from '../Utils/fetch-wrapper';

export const projectService = {
	getList,
	getById,
	create,
	update,
	delete: _delete,
};

async function getList() {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/restaurants/`);
}

async function getById(id: number) {
	return fetchWrapper.get(`${ApiUrl}/restaurants-admin/restaurants/${id}/`);
}

async function create(project: Project) {
	return fetchWrapper.post(`${ApiUrl}/restaurants-admin/restaurants/`, project);
}

async function update(project: Project) {
	return fetchWrapper.put(`${ApiUrl}/restaurants-admin/restaurants/${project.id}/`, project);
}

async function _delete(id: number) {
	return fetchWrapper.delete(`${ApiUrl}/restaurants-admin/restaurants/${id}/`);
}

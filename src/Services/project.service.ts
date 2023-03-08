import {ApiUrl} from '../const';
import {Project} from '../Lib/Redux/Projects/slice';
import {fetchWrapper} from '../Utils/fetch-wrapper';

export const projectService = {
	getList,
	getById,
	create,
	update,
	delete: _delete,
	getListTaskClasses,
};

async function getList() {
	return fetchWrapper.get(`${ApiUrl}/projects/`);
}

async function getById(id: number) {
	return fetchWrapper.get(`${ApiUrl}/projects/${id}/`);
}

async function create(project: Project) {
	return fetchWrapper.post(`${ApiUrl}/projects/`, project);
}

async function update(project: Project) {
	return fetchWrapper.put(`${ApiUrl}/projects/${project.id}/`, project);
}

async function _delete(id: number) {
	return fetchWrapper.delete(`${ApiUrl}/projects/${id}/`);
}

async function getListTaskClasses() {
	return fetchWrapper.get(`${ApiUrl}/task_classes/`);
}

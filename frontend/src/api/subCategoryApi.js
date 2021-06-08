import { axiosClient } from "./axiosClient";

const subCategoryApi = {
	getAll() {
		const url = `/subcategory`;
		return axiosClient.get(url);
	},

	remove(id) {
		const url = `/delete-subcategory/${id}`;
		return axiosClient.delete(url);
	},

	add(subCate) {
		const url = `/add-subcategory`;
		return axiosClient.post(url, subCate);
	},

	update(id, subCate) {
		const url = `/update-subcategory/${id}`;
		return axiosClient.put(url, subCate);
	},
};

export default subCategoryApi;

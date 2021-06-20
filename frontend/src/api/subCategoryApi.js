import { axiosClient } from "./axiosClient";

import { isAuthenticated } from "./../pages/Authentication/index";

const { user, token } = isAuthenticated();
const subCategoryApi = {
	getAll() {
		const url = `/subcategory`;
		return axiosClient.get(url);
	},

	remove(id) {
		const url = `/delete-subcategory/${id}/${user._id}`;
		return axiosClient.delete(url, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	add(subCate) {
		const url = `/add-subcategory/${user._id}`;
		return axiosClient.post(url, subCate, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	update(id, subCate) {
		const url = `/update-subcategory/${id}/${user._id}`;
		return axiosClient.put(url, subCate, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
};

export default subCategoryApi;

import { axiosClient } from "./axiosClient";
import { isAuthenticated } from "./../pages/Authentication/index";

const { user, token } = isAuthenticated();

const categoryApi = {
	getAll() {
		const url = "/category";
		return axiosClient.get(url);
	},

	add(cate) {
		const url = `/add-category/${user._id}`;
		return axiosClient.post(url, cate, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	update(id, cate) {
		const url = `/update-category/${id}/${user._id}`;
		return axiosClient.put(url, cate, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	remove(id) {
		const url = `/delete-category/${id}/${user._id}`;
		return axiosClient.delete(url, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
};

export default categoryApi;

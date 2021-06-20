import { axiosClient } from "./axiosClient";

import { isAuthenticated } from "./../pages/Authentication/index";

const { user, token } = isAuthenticated();

const productApi = {
	getAll() {
		const url = "/products";
		return axiosClient.get(url);
	},

	get(id) {
		const url = `/product/${id}`;
		return axiosClient.get(url);
	},

	add(product) {
		const url = `/add-product/${user._id}`;
		return axiosClient.post(url, product, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	remove(id) {
		const url = `/delete-product/${id}/${user._id}`;
		return axiosClient.delete(url, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	update(id, product) {
		const url = `/update-product/${id}/${user._id}`;
		return axiosClient.put(url, product, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
};

export default productApi;

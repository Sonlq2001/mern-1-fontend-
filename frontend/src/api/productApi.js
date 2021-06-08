import { axiosClient } from "./axiosClient";

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
		const url = `/add-product`;
		return axiosClient.post(url, product);
	},

	remove(id) {
		const url = `/delete-product/${id}`;
		return axiosClient.delete(url);
	},

	update(id, product) {
		const url = `/update-product/${id}`;
		return axiosClient.put(url, product);
	},
};

export default productApi;

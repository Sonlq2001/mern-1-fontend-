import { axiosClient } from "./axiosClient";

const cartApi = {
	getAll() {
		const url = "/cart";
		return axiosClient.get(url);
	},

	add(cart) {
		const url = "/add-cart";
		return axiosClient.post(url, cart);
	},

	update(id, cart) {
		const url = `/update-cart/${id}`;
		return axiosClient.put(url, cart);
	},

	remove(id) {
		const url = `/delete-cart/${id}`;
		return axiosClient.delete(url);
	},

	// removeMultiple() {
	// 	const url = `/delete-multiple-cart`;
	// 	return axiosClient.delete(url);
	// },
};

export default cartApi;

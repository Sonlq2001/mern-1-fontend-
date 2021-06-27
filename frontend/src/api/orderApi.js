import { axiosClient } from "./axiosClient";

const orderApi = {
	getAll() {
		const url = `/order`;
		return axiosClient.get(url);
	},

	add(order) {
		const url = `/add-order`;
		return axiosClient.post(url, order);
	},

	remove(id) {
		const url = `delete-order/${id}`;
		return axiosClient.delete(url);
	},
};

export default orderApi;

import { axiosClient } from "./axiosClient";

const orderDetailApi = {
	getAll() {
		const url = `order-detail`;
		return axiosClient.get(url);
	},

	add(orderDetail) {
		const url = `/add-order-detail`;
		return axiosClient.post(url, orderDetail);
	},

	update(id) {
		const url = `/update-order-detail/${id}`;
		return axiosClient.put(url);
	},
};

export default orderDetailApi;

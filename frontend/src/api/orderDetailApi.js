import { axiosClient } from "./axiosClient";

import { isAuthenticated } from "./../pages/Authentication/index";

const { user, token } = isAuthenticated();

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
		const url = `/update-order-detail/${id}/${user._id}`;
		return axiosClient.put(
			url,
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
	},

	remove(id) {
		const url = `/delete-order-detail/${id}`;
		return axiosClient.delete(url);
	},
};

export default orderDetailApi;

import { axiosClient } from "./axiosClient";

import { isAuthenticated } from "./../pages/Authentication/index";

const { user, token } = isAuthenticated();

const slideApi = {
	getAll() {
		const url = "/slide";
		return axiosClient.get(url);
	},

	get(id) {
		const url = `/slide/${id}`;
		return axiosClient.get(url);
	},

	add(slide) {
		const url = `/add-slide/${user._id}`;
		return axiosClient.post(url, slide, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	remove(id) {
		const url = `/delete-slide/${id}/${user._id}`;
		return axiosClient.delete(url, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	update(id, slide) {
		const url = `/update-slide/${id}/${user._id}`;
		return axiosClient.put(url, slide, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
};

export default slideApi;

import { axiosClient } from "./axiosClient";

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
		const url = "/add-slide";
		return axiosClient.post(url, slide);
	},

	remove(id) {
		const url = `/delete-slide/${id}`;
		return axiosClient.delete(url);
	},

	update(id, slide) {
		const url = `/update-slide/${id}`;
		return axiosClient.put(url, slide);
	},
};

export default slideApi;

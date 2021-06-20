import { axiosClient } from "./axiosClient";

const commentApi = {
	getAll() {
		const url = "/comment";
		return axiosClient.get(url);
	},

	add(cmt) {
		const url = "/add-comment";
		return axiosClient.post(url, cmt);
	},

	remove(id) {
		const url = `/delete-comment/${id}`;
		return axiosClient.delete(url);
	},
};

export default commentApi;

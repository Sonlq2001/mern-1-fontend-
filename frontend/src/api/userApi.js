import { axiosClient } from "./axiosClient";

import { isAuthenticated } from "./../pages/Authentication/index";

const result = JSON.parse(localStorage.getItem("user"));
if (result) {
	var { user: userAdmin, token } = result;
}

const userApi = {
	getAll() {
		const url = `/user`;
		return axiosClient.get(url);
	},

	add(user) {
		const url = `/add-user/${userAdmin._id}`;
		return axiosClient.post(url, user, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	update(id, user) {
		const url = `/update-user/${id}/${userAdmin._id}`;
		return axiosClient.put(url, user, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	updateClient(id, user) {
		const url = `/update-client/${id}`;
		return axiosClient.put(url, user);
	},

	remove(id) {
		const url = `/delete-user/${id}/${userAdmin._id}`;
		return axiosClient.delete(url, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	signUp(user) {
		const url = "/sign-up";
		return axiosClient.post(url, user);
	},

	signIn(user) {
		const url = "/sign-in";
		return axiosClient.post(url, user);
	},

	signOut() {
		const url = "/sign-out";
		return axiosClient.get(url);
	},
};

export default userApi;

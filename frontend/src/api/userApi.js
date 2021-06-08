import { axiosClient } from "./axiosClient";

const userApi = {
	getAll() {
		const url = `/user`;
		return axiosClient.get(url);
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

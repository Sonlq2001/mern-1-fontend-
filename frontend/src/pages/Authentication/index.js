import userApi from "./../../api/userApi";

export const authenticate = (data, next) => {
	if (typeof window !== undefined) {
		localStorage.setItem("user", JSON.stringify(data));
		next();
	}
};

export const signOut = async (next) => {
	if (typeof window !== undefined) {
		localStorage.removeItem("user");
		next();
		return await userApi.signOut();
	}
};

export const isAuthenticated = () => {
	if (typeof window == undefined) {
		return false;
	}

	if (localStorage.getItem("user")) {
		return JSON.parse(localStorage.getItem("user"));
	} else {
		return false;
	}
};

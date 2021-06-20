import typeAction from "./../typeAction/typeAction";
import userApi from "./../../api/userApi";

export const fetchUser = () => async (dispatch) => {
	try {
		const { data } = await userApi.getAll();
		dispatch({
			type: typeAction.LIST_USER,
			payload: data,
		});
	} catch (error) {}
};

export const addUser = (userInfo) => async (dispatch) => {
	try {
		const { data } = await userApi.add(userInfo);
		dispatch({
			type: typeAction.ADD_USER,
			payload: data,
		});
	} catch (error) {}
};

export const updateUser = (id, userInfo) => async (dispatch) => {
	try {
		const { data } = await userApi.update(id, userInfo);
		dispatch({
			type: typeAction.UPDATE_USER,
			payload: data,
		});
	} catch (error) {}
};

export const removeUser = (id) => async (dispatch) => {
	try {
		const { data } = await userApi.remove(id);
		dispatch({
			type: typeAction.REMOVE_USER,
			payload: data,
		});
	} catch (error) {}
};

export const updateUserClient = (id, userInfo) => async (dispatch) => {
	try {
		const { data } = await userApi.updateClient(id, userInfo);
		dispatch({
			type: typeAction.CLIENT_UPDATE,
			payload: data,
			success: true,
		});
	} catch (error) {
		dispatch({
			type: typeAction.ERROR_CLIENT_UPDATE,
			payload: error.response.data.error,
		});
	}
};

export const signIn = (userInfo) => async (dispatch) => {
	try {
		const { data } = await userApi.signIn(userInfo);
		dispatch({
			type: typeAction.SIGN_IN,
			payload: data,
		});
	} catch (error) {
		console.log(error.response.data.error);
		dispatch({
			type: typeAction.ERROR,
			payload: error.response.data.error,
		});
	}
};

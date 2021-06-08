import typeAction from "./../typeAction/typeAction";
import userApi from "./../../api/userApi";

export const signIn = (userInfo) => async (dispatch) => {
	try {
		const { data } = await userApi.signIn(userInfo);
		console.log(data);
		dispatch({
			type: typeAction.SIGN_IN,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: typeAction.ERROR,
			payload: error.response.data.error,
		});
	}
};

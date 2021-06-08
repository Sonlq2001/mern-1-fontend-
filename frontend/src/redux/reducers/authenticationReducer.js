import typeAction from "./../typeAction/typeAction";

const initialState = {
	user: null,
	loading: true,
};
const authenticationReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case typeAction.SIGN_IN:
			return {
				...state,
				user: payload,
				loading: false,
			};

		case typeAction.ERROR:
			return {
				...state,
				user: null,
				loading: false,
				message: payload,
			};
		default:
			return state;
	}
};

export default authenticationReducer;

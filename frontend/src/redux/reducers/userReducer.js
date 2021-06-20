import typeAction from "../typeAction/typeAction";

const initialState = {
	data: [],
	loading: true,
};

const userReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case typeAction.LIST_USER:
			return {
				...state,
				data: payload,
				loading: false,
			};
		case typeAction.ADD_USER:
			return {
				...state,
				data: [...state.data, payload],
			};

		case typeAction.UPDATE_USER:
			return {
				...state,
				data: state.data.map((user) =>
					user._id === payload._id ? payload : user
				),
			};

		case typeAction.REMOVE_USER:
			return {
				...state,
				data: state.data.filter((user) => user._id !== payload._id),
			};

		case typeAction.CLIENT_UPDATE:
			return {
				...state,
				data: state.data.map((user) =>
					user._id === payload._id ? payload : user
				),
				success: action.success,
			};

		case typeAction.ERROR_CLIENT_UPDATE:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};

export default userReducer;

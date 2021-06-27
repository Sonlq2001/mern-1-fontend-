import typeAction from "../typeAction/typeAction";

const initialState = {
	data: [],
	loading: true,
};

const orderReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case typeAction.LIST_ORDER:
			return {
				...state,
				data: payload,
				loading: false,
			};

		case typeAction.REMOVE_ORDER:
			return {
				...state,
				data: state.data.filter((order) => order._id !== payload),
			};
		default:
			return state;
	}
};

export default orderReducer;

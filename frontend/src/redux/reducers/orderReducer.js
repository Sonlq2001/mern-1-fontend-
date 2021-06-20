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
		default:
			return state;
	}
};

export default orderReducer;

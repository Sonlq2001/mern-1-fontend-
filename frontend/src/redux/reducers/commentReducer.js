import typeAction from "./../typeAction/typeAction";

const initialState = {
	data: [],
	loading: true,
};
const commentReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case typeAction.ADD_COMMENT:
			return {
				...state,
				data: [...state.data, payload],
			};

		case typeAction.LIST_COMMENT:
			return {
				...state,
				data: payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default commentReducer;

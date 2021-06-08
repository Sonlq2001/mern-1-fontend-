import typeAction from "./../typeAction/typeAction";

const initialState = {
	data: [],
	loading: true,
};

const slideReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case typeAction.LIST_SLIDE:
			return {
				...state,
				data: payload,
				loading: false,
			};

		case typeAction.REMOVE_SLIDE:
			return {
				...state,
				data: state.data.filter((slide) => slide._id != payload._id),
			};

		case typeAction.ADD_SLIDE:
			return {
				...state,
				data: [...state.data, payload],
			};

		case typeAction.DETAIL_SLIDE:
			return {
				...state,
				data: payload,
				loading: false,
			};

		case typeAction.UPDATE_SLIDE:
			return {
				...state,
				data: state.data.map((slide) =>
					slide._id === payload._id ? payload : slide
				),
			};
		default:
			return state;
	}
};

export default slideReducer;

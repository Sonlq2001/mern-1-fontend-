import typeAction from "../typeAction/typeAction";
const initialState = {
	data: [],
	loading: true,
};

const categoryReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case typeAction.LIST_CATEGORY:
			return {
				...state,
				data: payload,
				loading: false,
			};

		case typeAction.REMOVE_CATEGORY:
			return {
				...state,
				data: state.data.filter((cate) => cate._id != payload._id),
			};

		case typeAction.ADD_CATEGORY:
			return {
				...state,
				data: [...state.data, payload],
			};

		case typeAction.UPDATE_CATEGORY:
			return {
				...state,
				data: state.data.map((cate) =>
					cate._id == payload._id ? payload : cate
				),
			};
		default:
			return state;
	}
};

export default categoryReducer;

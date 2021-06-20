import typeAction from "./../typeAction/typeAction";

const initialState = {
	data: [],
	loading: true,
};

const subCategoryReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case typeAction.LIST_SUBCATEGORY:
			return {
				...state,
				data: payload,
				loading: false,
			};

		case typeAction.REMOVE_SUBCATEGORY:
			return {
				...state,
				data: state.data.filter(
					(subCate) => subCate._id !== payload._id
				),
			};

		case typeAction.ADD_SUBCATEGORY:
			return {
				...state,
				data: [...state.data, payload],
			};

		case typeAction.UPDATE_SUBCATEGORY:
			return {
				...state,
				data: state.data.map((subCate) =>
					subCate._id === payload._id ? payload : subCate
				),
			};

		case typeAction.SET_CHECKBOX:
			return {
				...state,
				data: state.data.map((subCate) => {
					if (subCate._id === payload) {
						subCate.select = action.checked;
						return subCate;
					} else {
						return subCate;
					}
				}),
			};

		default:
			return state;
	}
};

export default subCategoryReducer;

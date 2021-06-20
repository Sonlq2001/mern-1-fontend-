import typeAction from "./../typeAction/typeAction";

const initialState = {
	data: [],
	loading: true,
};

export const productReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case typeAction.LIST_PRODUCT:
			return {
				...state,
				data: payload,
				loading: false,
			};

		case typeAction.REMOVE_PRODUCT:
			return {
				...state,
				data: state.data.filter((prd) => prd._id !== payload._id),
			};

		case typeAction.ADD_PRODUCT:
			return {
				...state,
				data: [...state.data, payload],
			};

		case typeAction.UPDATE_PRODUCT:
			return {
				...state,
				data: state.data.map((prd) =>
					prd._id === payload._id ? payload : prd
				),
			};

		case typeAction.LOW_TO_HIGHT:
			return {
				...state,
				data: state.data.sort((item1, item2) => {
					return item1.price - item2.price;
				}),
			};

		case typeAction.HIGHT_TO_LOW:
			return {
				...state,
				data: state.data.sort(
					(item1, item2) => item2.price - item1.price
				),
			};

		case typeAction.FILTER_CATE:
			return {
				...state,
				data: state.data.filter((prd) => prd.cateId === payload),
			};
		default:
			return state;
	}
};

// chi tiết sản phẩm

const initialStateDetail = {
	data: {},
	loading: true,
};

export const detailProductReducer = (state = initialStateDetail, action) => {
	const { type, payload } = action;
	switch (type) {
		case typeAction.DETAIL_PRODUCT:
			return {
				...state,
				data: payload,
				loading: false,
			};
		default:
			return state;
	}
};

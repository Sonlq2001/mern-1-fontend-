import typeAction from "../typeAction/typeAction";

const initialState = {
	cart: [],
	loading: true,
};

const cartReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case typeAction.LIST_CART:
			return {
				...state,
				cart: payload,
				loading: false,
			};

		case typeAction.ADD_TO_CART:
			const updateProduct = state.cart.find(
				(prd) => prd.prdId === payload.prdId
			);
			if (updateProduct) {
				console.log("update");
				return {
					...state,
					cart: state.cart.map((item) =>
						item.prdId === payload.prdId ? payload : item
					),
				};
			} else {
				console.log("add");
				return {
					...state,
					cart: [...state.cart, payload],
				};
			}

		case typeAction.UPDATE_CART:
			return {
				...state,
				cart: state.cart.map((item) =>
					item.prdId === payload.prdId ? payload : item
				),
			};

		case typeAction.CLEAR_CART:
			return {
				...state,
				cart: payload,
			};

		case typeAction.REMOVE_CART:
			return {
				...state,
				cart: state.cart.filter(
					(itemCart) => itemCart._id !== payload._id
				),
			};
		default:
			return state;
	}
};

export default cartReducer;

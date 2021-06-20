import typeAction from "../../redux/typeAction/typeAction";

const initialState = {
	data: [],
	loading: true,
};

const orderDetailReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case typeAction.LIST_ORDER_DETAIL:
			return {
				...state,
				data: payload,
			};

		// case typeAction.UPDATE_STATUS:
		// 	const filterOrderDetail = state.data.filter(
		// 		(orderDetail) => orderDetail.orderId === payload
		// 	);
		// 	const updateOrderDetail = state.data.map((orderDetail) => {
		// 		if (orderDetail.orderId === payload) {
		// 			return {
		// 				...orderDetail,
		// 				status: 2,
		// 			};
		// 		} else {
		// 			return orderDetail;
		// 		}
		// 	});
		// 	// console.log(updateOrderDetail);
		// 	return {
		// 		...state,
		// 		data: [...state.data, ...updateOrderDetail],
		// 	};
		default:
			return state;
	}
};

export default orderDetailReducer;

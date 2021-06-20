import typeAction from "../typeAction/typeAction";
import orderDetailApi from "./../../api/orderDetailApi";

export const fetchOrderDetail = () => async (dispatch) => {
	try {
		const { data } = await orderDetailApi.getAll();
		dispatch({
			type: typeAction.LIST_ORDER_DETAIL,
			payload: data,
		});
	} catch (error) {}
};

export const updateOrderDetail = (id) => async (dispatch) => {
	try {
		const result = await orderDetailApi.update(id);
		// console.log(result);
		// if (result.status === 200) {
		// 	dispatch({
		// 		type: typeAction.UPDATE_STATUS,
		// 		payload: id,
		// 	});
		// }
	} catch (error) {}
};

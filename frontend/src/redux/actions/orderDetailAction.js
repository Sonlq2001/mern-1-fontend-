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
		await orderDetailApi.update(id);
	} catch (error) {}
};

export const removeOrderDetail = (id) => async (dispatch) => {
	try {
		const { data } = await orderDetailApi.remove(id);
	} catch (error) {}
};

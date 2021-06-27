import typeAction from "../typeAction/typeAction";
import orderApi from "./../../api/orderApi";

export const fetchOrder = () => async (dispatch) => {
	try {
		const { data } = await orderApi.getAll();
		dispatch({
			type: typeAction.LIST_ORDER,
			payload: data,
		});
	} catch (error) {}
};

export const removeOrder = (id) => async (dispatch) => {
	try {
		const { data } = await orderApi.remove(id);
		dispatch({
			type: typeAction.REMOVE_ORDER,
			payload: id,
		});
	} catch (error) {}
};

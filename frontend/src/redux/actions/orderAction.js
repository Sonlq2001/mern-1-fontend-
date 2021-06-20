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

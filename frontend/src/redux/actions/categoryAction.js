import categoryApi from "./../../api/categoryApi";
import typeAction from "./../typeAction/typeAction";

export const fetchCategory = () => async (dispatch) => {
	try {
		const { data } = await categoryApi.getAll();
		dispatch({
			type: typeAction.LIST_CATEGORY,
			payload: data,
		});
	} catch (error) {}
};

export const removeCategory = (id) => async (dispatch) => {
	try {
		const { data } = await categoryApi.remove(id);
		dispatch({
			type: typeAction.REMOVE_CATEGORY,
			payload: data,
		});
	} catch (error) {}
};

export const addCategory = (cate) => async (dispatch) => {
	try {
		const { data } = await categoryApi.add(cate);
		dispatch({
			type: typeAction.ADD_CATEGORY,
			payload: data,
		});
	} catch (error) {
		// console.log(error.response.data);
	}
};

export const updateCategory = (id, cate) => async (dispatch) => {
	try {
		const { data } = await categoryApi.update(id, cate);
		dispatch({
			type: typeAction.UPDATE_CATEGORY,
			payload: data,
		});
	} catch (error) {}
};

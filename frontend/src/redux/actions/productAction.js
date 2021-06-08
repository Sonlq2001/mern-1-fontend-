import typeAction from "./../typeAction/typeAction";
import productApi from "./../../api/productApi";

export const fetchProduct = () => async (dispatch) => {
	try {
		const { data } = await productApi.getAll();
		dispatch({
			type: typeAction.LIST_PRODUCT,
			payload: data,
		});
	} catch (error) {}
};

export const removeProduct = (id) => async (dispatch) => {
	try {
		const { data } = await productApi.remove(id);
		dispatch({
			type: typeAction.REMOVE_PRODUCT,
			payload: data,
		});
	} catch (error) {}
};

export const addProduct = (product) => async (dispatch) => {
	try {
		const { data } = await productApi.add(product);
		dispatch({
			type: typeAction.ADD_PRODUCT,
			payload: data,
		});
	} catch (error) {}
};

export const updateProduct = (id, product) => async (dispatch) => {
	try {
		const { data } = await productApi.update(id, product);
		dispatch({
			type: typeAction.UPDATE_PRODUCT,
			payload: data,
		});
	} catch (error) {}
};

export const findProduct = (id) => async (dispatch) => {
	try {
		const { data } = await productApi.get(id);
		dispatch({
			type: typeAction.DETAIL_PRODUCT,
			payload: data,
		});
	} catch (error) {}
};

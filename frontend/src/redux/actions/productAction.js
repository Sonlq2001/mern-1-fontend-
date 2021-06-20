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

export const lowToHight = () => (dispatch) => {
	dispatch({
		type: typeAction.LOW_TO_HIGHT,
	});
};

export const hightToLow = () => (dispatch) => {
	dispatch({
		type: typeAction.HIGHT_TO_LOW,
	});
};

export const searchMain = () => (dispatch) => {
	console.log("ok search");
};

export const filterCate = (id) => (dispatch) => {
	dispatch({
		type: typeAction.FILTER_CATE,
		payload: id,
	});
};

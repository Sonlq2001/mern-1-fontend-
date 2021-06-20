import typeAction from "./../typeAction/typeAction";
import subCategoryApi from "./../../api/subCategoryApi";

export const fetchSubCategory = (keySearch) => async (dispatch) => {
	try {
		const { data } = await subCategoryApi.getAll();
		// const handleData = data.map((item) => ({
		// 	select: false,
		// 	...item,
		// }));
		dispatch({
			type: typeAction.LIST_SUBCATEGORY,
			payload: data,
		});
	} catch (error) {}
};

export const removeSubCategory = (id) => async (dispatch) => {
	try {
		const { data } = await subCategoryApi.remove(id);
		dispatch({
			type: typeAction.REMOVE_SUBCATEGORY,
			payload: data,
		});
	} catch (error) {}
};

export const addSubCategory = (subCate) => async (dispatch) => {
	try {
		const { data } = await subCategoryApi.add(subCate);
		dispatch({
			type: typeAction.ADD_SUBCATEGORY,
			payload: data,
		});
	} catch (error) {}
};

export const updateSubCategory = (id, subCate) => async (dispatch) => {
	try {
		const { data } = await subCategoryApi.update(id, subCate);
		dispatch({
			type: typeAction.UPDATE_SUBCATEGORY,
			payload: data,
		});
	} catch (error) {}
};

export const setCheckbox = (checked, id) => (dispatch) => {
	dispatch({
		type: typeAction.SET_CHECKBOX,
		payload: id,
		checked,
	});
};

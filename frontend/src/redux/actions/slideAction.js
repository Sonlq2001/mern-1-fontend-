import { useHistory } from "react-router-dom";
import typeAction from "./../typeAction/typeAction";
import slideApi from "./../../api/slideApi";

export const fetchSlide = () => async (dispatch) => {
	try {
		const { data } = await slideApi.getAll();
		dispatch({
			type: typeAction.LIST_SLIDE,
			payload: data,
		});
	} catch (error) {}
};

export const removeSlide = (id) => async (dispatch) => {
	try {
		const { data } = await slideApi.remove(id);
		dispatch({
			type: typeAction.REMOVE_SLIDE,
			payload: data,
		});
	} catch (error) {}
};

export const addSlide = (slide) => async (dispatch) => {
	try {
		const { data } = await slideApi.add(slide);
		dispatch({
			type: typeAction.ADD_SLIDE,
			payload: data,
		});
	} catch (error) {}
};

export const updateSlide = (id, slide) => async (dispatch) => {
	try {
		const { data } = await slideApi.update(id, slide);
		dispatch({
			type: typeAction.UPDATE_SLIDE,
			payload: data,
		});
	} catch (error) {}
};

export const fetchOne = (id) => async (dispatch) => {
	try {
		const { data } = await slideApi.get(id);
		dispatch({
			type: typeAction.DETAIL_SLIDE,
			payload: data,
		});
	} catch (error) {}
};

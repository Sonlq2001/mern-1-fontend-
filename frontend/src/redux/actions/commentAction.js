import commentApi from "./../../api/commentApi";
import typeAction from "./../typeAction/typeAction";

export const addComment = (cmt) => async (dispatch) => {
	try {
		const { data } = await commentApi.add(cmt);
		dispatch({
			type: typeAction.ADD_COMMENT,
			payload: data,
		});
	} catch (error) {}
};

export const fetchComment = () => async (dispatch) => {
	try {
		const { data } = await commentApi.getAll();
		dispatch({
			type: typeAction.LIST_COMMENT,
			payload: data,
		});
	} catch (error) {}
};

export const removeComment = (id) => (dispatch) => {
	try {
		const { data } = commentApi.remove(id);
		dispatch({
			type: typeAction.REMOVE_COMMENT,
			payload: data,
		});
	} catch (error) {}
};

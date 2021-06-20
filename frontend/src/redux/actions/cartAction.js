import typeAction from "../typeAction/typeAction";
import cartApi from "./../../api/cartApi";

export const fetchCart = () => async (dispatch) => {
	try {
		const { data } = await cartApi.getAll();
		dispatch({
			type: typeAction.LIST_CART,
			payload: data,
		});
	} catch (error) {}
};

export const addToCart =
	(id, userId, price, quantity = 1) =>
	async (dispatch) => {
		const cart = {
			userId: userId,
			prdId: id,
			quantity: quantity,
			price,
		};

		const { data: listCart } = await cartApi.getAll();
		if (listCart.length <= 0) {
			try {
				const { data } = await cartApi.add(cart);
				dispatch({
					type: typeAction.ADD_TO_CART,
					payload: data,
				});
			} catch (error) {}
		} else {
			const cartUpdate = listCart.find((cart) => {
				return cart.prdId === id && cart.userId === userId;
			});
			if (cartUpdate) {
				cartUpdate.quantity += quantity;
				try {
					const { data } = await cartApi.update(
						cartUpdate._id,
						cartUpdate
					);
					dispatch({
						type: typeAction.ADD_TO_CART,
						payload: data,
					});
				} catch (error) {}
			} else {
				try {
					const { data } = await cartApi.add(cart);
					dispatch({
						type: typeAction.ADD_TO_CART,
						payload: data,
					});
				} catch (error) {}
			}
		}
	};

export const clearCart = () => (dispatch) => {
	dispatch({
		type: typeAction.CLEAR_CART,
		payload: 0,
	});
};

export const increase =
	(cartId, prdId, userId, quantity) => async (dispatch) => {
		const cart = {
			userId: userId,
			prdId: prdId,
			quantity: quantity + 1,
		};
		// cart.quantity += 1;
		console.log(cartId);
		try {
			const { data } = await cartApi.update(cartId, cart);
			dispatch({
				type: typeAction.ADD_TO_CART,
				payload: data,
			});
		} catch (error) {}
	};

export const decrease =
	(cartId, prdId, userId, quantity) => async (dispatch) => {
		const cart = {
			userId: userId,
			prdId: prdId,
			quantity: quantity - 1,
		};
		// cart.quantity += 1;
		try {
			const { data } = await cartApi.update(cartId, cart);
			dispatch({
				type: typeAction.ADD_TO_CART,
				payload: data,
			});
		} catch (error) {}
	};

export const removeCart = (id) => async (dispatch) => {
	try {
		const { data } = await cartApi.remove(id);
		dispatch({
			type: typeAction.REMOVE_CART,
			payload: data,
		});
	} catch (error) {}
};

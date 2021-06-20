import { combineReducers } from "redux";

import authenticationReducer from "./authenticationReducer";

import slideReducer from "./slideReducer";
import categoryReducer from "./categoryReducer";
import { productReducer, detailProductReducer } from "./productReducer";
import subCategoryReducer from "./subCategoryReducer";
import commentReducer from "./commentReducer";
import cartReducer from "./../reducers/cartReducer";
import userReducer from "./../reducers/userReducer";
import orderReducer from "./../reducers/orderReducer";
import orderDetailReducer from "./../reducers/orderDetailReducer";

const rootReducer = combineReducers({
	slides: slideReducer,
	categories: categoryReducer,
	products: productReducer,
	detailProduct: detailProductReducer,
	subCategories: subCategoryReducer,
	auth: authenticationReducer,
	comments: commentReducer,
	carts: cartReducer,
	users: userReducer,
	orders: orderReducer,
	ordersDetail: orderDetailReducer,
});

export default rootReducer;

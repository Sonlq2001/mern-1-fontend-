import { combineReducers } from "redux";

import authenticationReducer from "./authenticationReducer";

import slideReducer from "./slideReducer";
import categoryReducer from "./categoryReducer";
import { productReducer, detailProductReducer } from "./productReducer";
import subCategoryReducer from "./subCategoryReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
	slides: slideReducer,
	categories: categoryReducer,
	products: productReducer,
	detailProduct: detailProductReducer,
	subCategories: subCategoryReducer,
	auth: authenticationReducer,
	comments: commentReducer,
});

export default rootReducer;

import "./../scss/components/fix_admin.scss";

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./Header/Header";
import Aside from "./Aside/Aside";
import Dashboard from "./Dashboard/Dashboard";

import Product from "./Product/ListProduct";
import AddProduct from "./Product/AddProduct";
import EditProduct from "./Product/EditProduct";

import ListCategory from "./Category/ListCategory";
import AddCategory from "./Category/AddCategory";
import EditCategory from "./Category/EditCategory";

import ListSlide from "./Slide/ListSlide";
import AddSlide from "./Slide/AddSlide";
import EditSlide from "./Slide/EditSlide";

import ListSubCategory from "./SubCategory/ListSubCategory";
import FormSubCategory from "./SubCategory/FormSubCategory";

import ListComment from "./Comment/ListComment";
import DetailComment from "./Comment/DetailComment";

import ListUser from "./User/ListUser";
import FormUser from "./User/FormUser";

import ListOrder from "./Order/ListOrder";
import DetailOrder from "./Order/DetailOrder";

const Main = (props) => {
	return (
		<>
			<Router>
				<div
					id="main-wrapper"
					data-layout="vertical"
					data-navbarbg="skin5"
					data-sidebartype="full"
					data-sidebar-position="absolute"
					data-header-position="absolute"
					data-boxed-layout="full"
				>
					<Header />

					<Aside />

					<div className="page-wrapper wrap-main">
						<div className="container-fluid">
							{/* <Switch> */}
							<Route exact path="/admin" component={Dashboard} />

							<Route
								exact
								path="/admin/slide"
								component={ListSlide}
							/>
							<Route
								// exact
								path="/admin/add-slide"
								component={AddSlide}
							/>
							<Route
								// exact
								path="/admin/edit-slide/:id"
								component={EditSlide}
							/>

							{/* product */}
							<Route
								// exact
								path="/admin/product"
								component={Product}
							/>
							<Route
								// exact
								path="/admin/add-product"
								component={AddProduct}
							/>
							<Route
								// exact
								path="/admin/edit-product/:id"
								component={EditProduct}
							/>

							{/* category */}
							<Route
								// exact
								path="/admin/category"
								component={ListCategory}
							/>
							<Route
								// exact
								path="/admin/add-category"
								component={AddCategory}
							/>
							<Route
								// exact
								path="/admin/edit-category/:id"
								component={EditCategory}
							/>

							{/* sub category */}
							<Route
								path="/admin/subcategory"
								component={ListSubCategory}
							/>
							<Route
								exact
								path="/admin/action-subcategory"
								component={FormSubCategory}
							/>
							<Route
								path="/admin/action-subcategory/:id"
								component={FormSubCategory}
							/>

							{/* comment */}
							<Route
								exact
								path="/admin/comment"
								component={ListComment}
							/>
							<Route
								exact
								path="/admin/comment/:id"
								component={DetailComment}
							/>

							{/* user */}
							<Route path="/admin/user" component={ListUser} />
							<Route
								path="/admin/add-user"
								component={FormUser}
							/>
							<Route
								path="/admin/edit-user/:id"
								component={FormUser}
							/>
							{/* order */}
							<Route
								exact
								path="/admin/order"
								component={ListOrder}
							/>
							<Route
								path="/admin/order/:id"
								component={DetailOrder}
							/>

							{/* </Switch> */}
						</div>
					</div>
				</div>
			</Router>
		</>
	);
};

// Dashboard.propTypes = {

// }

export default Main;

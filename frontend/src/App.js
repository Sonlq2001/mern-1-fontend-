import "./scss/App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./admin/Main";
import PrivateRouter from "./admin/PrivateRoute";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";

import CateProduct from "./pages/Product/CateProduct";
import SubCateProduct from "./pages/Product/SubCateProduct";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import SearchProduct from "./pages/Product/SearchProduct";

import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import PrivateAuth from "./pages/Authentication/PrivateAuth";

import Card from "./pages/Card/Card";
import Pay from "./pages/Card/Pay";

import Account from "./pages/Account/Account";
import ManageOrder from "./pages/ManageOrder/ManageOrder";
import ViewOrder from "./pages/ManageOrder/ViewOrder";

function App() {
	return (
		<>
			<div className="">
				<Router>
					<Switch>
						<PrivateAuth path="/sign-in">
							<SignIn />
						</PrivateAuth>
						<Route exact path="/sign-up" component={SignUp} />
						<PrivateRouter path="/admin">
							<Main />
						</PrivateRouter>

						{/* UI client */}
						<Route>
							<Header />
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>

								<Route
									exact
									path="/cate/:id"
									component={CateProduct}
								/>
								<Route
									exact
									path="/cate/:id/:type"
									component={SubCateProduct}
								/>
								<Route
									exact
									path="/product/:id"
									component={ProductDetail}
								/>
								<Route
									exact
									path="/search/:q"
									component={SearchProduct}
								/>
								<Route exact path="/card" component={Card} />
								<Route exact path="/pay" component={Pay} />
								<Route
									path="/customer/account"
									component={Account}
								/>
								<Route
									path="/order/history"
									component={ManageOrder}
								/>
								<Route
									path="/order/view/:id"
									component={ViewOrder}
								/>
							</Switch>
							<Footer />
						</Route>
					</Switch>
				</Router>
			</div>
		</>
	);
}

export default App;

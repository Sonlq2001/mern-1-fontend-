import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import { fetchCart } from "./../../redux/actions/cartAction";

import TableCart from "./TableCart";
import FormPay from "./FormPay";
import { isAuthenticated } from "./../../pages/Authentication/index";
import CartNotFound from "./CartNotFound";
import Loading from "./../../components/Loading";

const Pay = ({ listCart, fetchCart }) => {
	useEffect(() => {
		fetchCart();
	}, []);

	const { user } = isAuthenticated();
	const { cart: dataCart, loading } = listCart;

	if (user) {
		if (loading) {
			return <Loading />;
		} else if (dataCart.length > 0) {
			// list order theo user
			const listOrder = dataCart.filter(
				(cart) => cart.userId === user._id
			);
			return (
				<>
					<div className="main bgr">
						<div className="container">
							<div className="all-product">
								<div className="row mt-5">
									<TableCart disable={false} />
								</div>
								{listOrder.length > 0 && <FormPay />}
								{/* {listOrder.length <= 0 && <CartNotFound />} */}
							</div>
						</div>
					</div>
				</>
			);
		} else {
			return <CartNotFound />;
		}
	} else {
		return <div>Cần đăng nhập vào </div>;
	}
};

const mapStateToProps = (state) => {
	return {
		listCart: state.carts,
	};
};

export default connect(mapStateToProps, { fetchCart })(Pay);

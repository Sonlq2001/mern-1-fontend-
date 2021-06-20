import React from "react";
import { Link } from "react-router-dom";

const CartNotFound = () => {
	return (
		<>
			<div className="empty-cart">
				<p className="empty-cart__title">
					Chưa có sản phẩm nào trong giỏ hàng !
				</p>
				<Link to="/" className="empty-cart__go-shopping">
					Mua sắm ?
				</Link>
				<img
					src="https://media.istockphoto.com/vectors/shopping-cart-shop-trolley-or-basket-in-the-supermarket-vector-id1139666909?b=1&k=6&m=1139666909&s=612x612&w=0&h=svP7dzvP7_z9YfXEsEh2Jh77Ox5-mUXVkhaAlh_GnqY="
					alt=""
					className="empty-cart__img"
				/>
			</div>
		</>
	);
};

export default CartNotFound;

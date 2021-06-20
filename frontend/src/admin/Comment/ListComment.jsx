import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchComment } from "./../../redux/actions/commentAction";
import { fetchProduct } from "./../../redux/actions/productAction";

import HeaderTable from "./../common/HeaderTable";
import TableComment from "./TableComment";
import Loading from "./../../components/Loading";
import NotFoundAdmin from "./../common/NotFoundAdmin";

const ListComment = ({
	listProduct,
	listComment,
	fetchProduct,
	fetchComment,
}) => {
	useEffect(() => {
		fetchProduct();
		fetchComment();
	}, []);

	const { data: dataComment, loading } = listComment;
	const { data: dataProduct } = listProduct;

	if (loading) {
		return <Loading loading_admin="loading-admin" />;
	} else if (dataComment.length > 0 && dataProduct.length > 0) {
		const listCmt = [];
		dataProduct.forEach((prd) => {
			const commented = dataComment.filter(
				(cmt) => cmt.prdId === prd._id
			);

			const handleCmt = commented.map((cmt, index) => {
				if (index < 1) {
					return {
						_id: prd._id,
						name: prd.name,
						quantity: commented.length,
						time: cmt.createdAt,
					};
				} else {
					return false;
				}
			});
			listCmt.push(...handleCmt);
		});

		if (listCmt.length > 0) {
			return (
				<>
					<HeaderTable title="Danh sách comment" path="" />
					<div className="row bg-white fs-5">
						<div className="col col-lg-12">
							<TableComment data={listCmt} />
						</div>
					</div>
				</>
			);
		} else {
			return null;
		}
	} else {
		return <NotFoundAdmin title="Hiện tại chưa có dữ liệu comment nào !" />;
	}
};

const mapStateToProps = (state) => {
	return {
		listComment: state.comments,
		listProduct: state.products,
	};
};

const mapActionToProps = {
	fetchComment,
	fetchProduct,
};

export default connect(mapStateToProps, mapActionToProps)(ListComment);

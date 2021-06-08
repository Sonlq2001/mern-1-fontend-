import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types'
import { useSelector, useDispatch } from "react-redux";

import { fetchComment } from "./../../redux/actions/commentAction";
import { fetchProduct } from "./../../redux/actions/productAction";

import userApi from "./../../api/userApi";
import HeaderTable from "./../common/HeaderTable";
import TableComment from "./TableComment";

const ListComment = (props) => {
	const [listUser, setListUser] = useState([]);
	const {
		comments: { data },
		products: { data: listProduct },
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchComment());
		dispatch(fetchProduct());

		const callApi = async () => {
			try {
				const { data } = await userApi.getAll();
				setListUser(data);
			} catch (error) {}
		};
		callApi();
	}, []);

	const listCmt = [];
	listProduct.forEach((prd) => {
		const commented = data.filter((cmt) => cmt.prdId == prd._id);

		const handleCmt = commented.map((cmt) => {
			return {
				_id: prd._id,
				name: prd.name,
				quantity: commented.length,
			};
		});
		listCmt.push(...handleCmt);
	});
	const a = Array.from(new Set(listCmt));
	console.log(a);

	return (
		<>
			<HeaderTable title="Danh sách comment" path="" />
			<div className="row bg-white">
				<div className="col col-lg-12">
					{/* <div className="card-body">
						<h5 className="card-title mb-0">Static Table</h5>
					</div> */}
					<TableComment />
				</div>
			</div>
		</>
	);
};

// ListComment.propTypes = {

// }

export default ListComment;

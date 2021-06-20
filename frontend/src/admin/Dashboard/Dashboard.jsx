import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";

import { fetchUser } from "./../../redux/actions/userActions";
import { fetchProduct } from "./../../redux/actions/productAction";
import { fetchCategory } from "./../../redux/actions/categoryAction";
import { fetchComment } from "./../../redux/actions/commentAction";
import Loading from "./../../components/Loading";

const Dashboard = ({
	listUser,
	fetchUser,
	listProduct,
	fetchProduct,
	listCategory,
	fetchCategory,
	listComment,
	fetchComment,
}) => {
	useEffect(() => {
		fetchUser();
		fetchProduct();
		fetchCategory();
		fetchComment();
	}, []);
	const { data: dataUser, loading } = listUser;
	const { data: dataProduct } = listProduct;
	const { data: dataCategory } = listCategory;
	const { data: dataComment } = listComment;

	if (loading) {
		return <Loading />;
	} else if (
		dataUser.length > 0 ||
		dataProduct.length > 0 ||
		dataCategory.length > 0 ||
		dataComment.length > 0
	) {
		const listData = dataUser.map((item, index) => {
			return {
				name: `Tháng ${index + 1}`,
				user: item.name,
			};
		});
		return (
			<>
				<div className="row">
					<div className="col col-lg-3">
						<div className="box-statistical red">
							<i className="fas fa-users"></i>
							{dataUser.length}
						</div>
					</div>
					<div className="col col-lg-3">
						<div className="box-statistical blue">
							<i className="fas fa-gifts"></i>
							{dataProduct.length}
						</div>
					</div>

					<div className="col col-lg-3">
						<div className="box-statistical green">
							<i className="fas fa-project-diagram"></i>
							{dataCategory.length}
						</div>
					</div>
					<div className="col col-lg-3">
						<div className="box-statistical orange">
							<i className="fas fa-comment-dots"></i>
							{dataComment.length}
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<LineChart
						width={600}
						height={300}
						data={listData}
						margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
					>
						<Line
							type="monotone"
							// dataKey="uv"
							dataKey="user"
							stroke="#8884d8"
						/>
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
					</LineChart>
				</div>
			</>
		);
	} else {
		return null;
	}
};

const mapStateToProps = (state) => {
	return {
		listUser: state.users,
		listProduct: state.products,
		listCategory: state.categories,
		listComment: state.comments,
	};
};

const mapActionToProps = {
	fetchUser,
	fetchProduct,
	fetchCategory,
	fetchComment,
};

export default connect(mapStateToProps, mapActionToProps)(Dashboard);

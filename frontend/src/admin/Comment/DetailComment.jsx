import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import {
	fetchComment,
	removeComment,
} from "./../../redux/actions/commentAction";
import { fetchUser } from "./../../redux/actions/userActions";
import Loading from "./../../components/Loading";

const DetailComment = ({
	listComment,
	listUser,
	fetchUser,
	fetchComment,
	removeComment,
}) => {
	const { id } = useParams();

	useEffect(() => {
		fetchComment();
		fetchUser();
	}, []);

	const { data: dataComment, loading } = listComment;
	const { data: dataUser } = listUser;

	if (loading) {
		return <Loading />;
	} else {
		// xử lý comment
		let dataCmt = [];
		const result = dataComment.filter((cmt) => {
			return cmt.prdId === id;
		});

		result.forEach((cmt) => {
			const userCmt = dataUser.filter((user) => user._id === cmt.userId);

			const mixCmt = userCmt.map((user) => {
				return {
					_id: cmt._id,
					content: cmt.content,
					time: cmt.createdAt,
					name: user.name,
				};
			});
			dataCmt.push(...mixCmt);
		});

		// remove comment
		const removeCmt = (id) => {
			if (window.confirm("Bạn thực sự muốn xóa !")) {
				removeComment(id);
			}
		};

		return (
			<>
				<div className="row bg-white fs-5">
					<div className="col col-lg-12">
						<div className="card-body">
							<h5 className="card-title mb-0">
								Chi tiết comment sản phẩm
							</h5>
						</div>
						<table className="table table-bordered mt-4">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Nội dung bình luận</th>
									<th scope="col">Ngày bình luận</th>
									<th scope="col">Người bình luận</th>
									<th scope="col">Hành động</th>
								</tr>
							</thead>
							<tbody>
								{dataCmt.map((cmt, index) => {
									return (
										<tr key={cmt._id}>
											<td>{index + 1}</td>
											<td>{cmt.content}</td>
											<td>
												{moment(cmt.time).format(
													"HH:MM DD/MM/YYYY"
												)}
											</td>
											<td>{cmt.name}</td>
											<td>
												<button
													className="btn btn-danger fs-5"
													onClick={() =>
														removeCmt(cmt._id)
													}
												>
													Xóa
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		listUser: state.users,
		listComment: state.comments,
	};
};

const mapActionToProps = {
	fetchComment,
	fetchUser,
	removeComment,
};

export default connect(mapStateToProps, mapActionToProps)(DetailComment);

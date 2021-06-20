import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import { isAuthenticated } from "./../../pages/Authentication/index";
import { fetchComment, addComment } from "./../../redux/actions/commentAction";
import { fetchUser } from "./../../redux/actions/userActions";
import product_1 from "./../../assets/images/product-1.jpg";

const DetailComment = ({
	comments,
	fetchComment,
	addComment,
	listUser,
	fetchUser,
}) => {
	const { user } = isAuthenticated();
	const { id } = useParams();

	useEffect(() => {
		fetchComment();
		fetchUser();
	}, []);

	const { data, loading } = comments;
	const { data: dataUser } = listUser;

	// xứ lý cmt
	const dataCmt = [];
	const listCmt = data.filter((cmt) => cmt.prdId === id);
	listCmt.forEach((cmt) => {
		const listUserCmt = dataUser.filter((user) => user._id === cmt.userId);
		const mixCmt = listUserCmt.map((user) => {
			return {
				_id: cmt._id,
				name: user.name,
				content: cmt.content,
				time: cmt.createdAt,
			};
		});
		dataCmt.push(...mixCmt);
	});

	// xử lý effect comment
	const [finish, setFinish] = useState(false);

	// xử lý add comment
	const [value, setValue] = useState("");
	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const comment = {
			userId: user._id,
			prdId: id,
			content: value,
		};
		setValue("");
		addComment(comment);
	};

	return (
		<>
			<div className="col col-lg-9 col-md-12 col-sm-12 col-12">
				<div className="comment-group">
					<div className="comment-header">
						<div className="count-comment">
							{dataCmt.length} Comments
						</div>
					</div>

					{user && (
						<div className="comment-body">
							<div className="comment-body__avatar">
								<img
									src={product_1}
									alt=""
									className="comment-body__avatar-img"
								/>
							</div>

							<form
								className="comment-box"
								onSubmit={handleSubmit}
							>
								<input
									text="text"
									className="comment-box__input"
									placeholder="Bình luận"
									onChange={handleChange}
									value={value}
									onClick={() => setFinish(true)}
								></input>
								{finish && (
									<div className="comment-box-control">
										<button
											className="btn-cancel btn-cmt"
											onClick={() => setFinish(false)}
										>
											cancel
										</button>
										<button className="btn-submit btn-cmt">
											comment
										</button>
									</div>
								)}
							</form>
						</div>
					)}

					{!user && (
						<div>Bạn cần đăng nhập để dử dụng chức năng nầy</div>
					)}

					<div className="list-comment">
						{dataCmt.map((cmt) => {
							return (
								<div className="box-commented" key={cmt._id}>
									<div className="box-commented__author">
										<img
											src={product_1}
											alt=""
											className="box-commented__author-img"
										/>
									</div>
									<div className="commented-content">
										<div className="commented-content__author">
											{cmt.name}
										</div>
										<div className="commented-content__txt">
											{cmt.content}
										</div>
										<div className="commented-action">
											<span className="commented-action__like">
												Thích
											</span>
											<span className="commented-action__dot">
												<i className="fas fa-circle"></i>
											</span>
											<span className="commented-time">
												{moment(cmt.createdAt).format(
													"HH:MM DD/MM/YYYY"
												)}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		comments: state.comments,
		listUser: state.users,
	};
};

const mapActionToProps = {
	fetchComment,
	fetchUser,
	addComment,
};

export default connect(mapStateToProps, mapActionToProps)(DetailComment);

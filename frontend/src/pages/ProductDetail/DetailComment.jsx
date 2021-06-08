import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { isAuthenticated } from "./../../pages/Authentication/index";
import { fetchComment, addComment } from "./../../redux/actions/commentAction";
import product_1 from "./../../assets/images/product-1.jpg";
import userApi from "./../../api/userApi";

const DetailComment = (props) => {
	const { data, loading } = useSelector((state) => state.comments);
	const dispatch = useDispatch();
	const [listUser, setListUser] = useState([]);
	const { user } = isAuthenticated();
	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchComment());
	}, []);

	useEffect(() => {
		const callApi = async () => {
			try {
				const { data } = await userApi.getAll();
				setListUser(data);
			} catch (error) {}
		};
		callApi();
	}, []);

	// xứ lý cmt
	const dataCmt = [];
	const listCmt = data.filter((cmt) => cmt.prdId === id);
	listCmt.forEach((cmt) => {
		const listUserCmt = listUser.filter((user) => user._id === cmt.userId);

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

	// xử lý form comment
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
		dispatch(addComment(comment));
	};

	return (
		<>
			<div className="col col-lg-9">
				<div className="comment-group">
					<div className="comment-header">
						<div className="count-comment">0 Comments</div>
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
								></input>
								<div className="comment-box-control">
									<button className="btn-cancel btn-cmt">
										cancel
									</button>
									<button className="btn-submit btn-cmt">
										comment
									</button>
								</div>
							</form>
						</div>
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
												2 ngày trước
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

// DetailComment.propTypes = {

// }

export default DetailComment;

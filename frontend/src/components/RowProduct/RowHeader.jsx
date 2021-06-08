import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSubCategory } from "./../../redux/actions/subCategoryAction";
const RowHeader = ({ category }) => {
	const { data } = useSelector((state) => state.subCategories);
	const dispatch = useDispatch();

	const subCateFollowCate = data.filter(
		(subCate) => subCate.cateId == category._id
	);

	return (
		<>
			<div className="model-header">
				<div className="model-cate">
					<img
						src={`http://localhost:4000/api/category/img/${category._id}`}
						alt=""
						className="model-cate__img"
					/>
					<span className="model-cate__txt">{category.name}</span>
				</div>

				<ul className="model-list">
					{subCateFollowCate.map((subCate, index) => {
						if (index < 5) {
							return (
								<li
									className="model-list__item"
									key={subCate._id}
								>
									<Link
										to={`/cate/${category._id}/${subCate.name}`}
										className="model-path"
									>
										{subCate.name}
									</Link>
								</li>
							);
						}
					})}
				</ul>

				<Link to={`/cate/${category._id}`} className="view-more">
					Xem tất cả &#187;
				</Link>
			</div>
		</>
	);
};

// RowHeader.propTypes = {};

export default RowHeader;

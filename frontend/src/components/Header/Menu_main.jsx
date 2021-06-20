import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import { fetchSlide } from "./../../redux/actions/slideAction";
import { fetchCategory } from "./../../redux/actions/categoryAction";
import { fetchSubCategory } from "./../../redux/actions/subCategoryAction";

import banner1 from "./../../assets/images/banner-1.jpg";
import banner2 from "./../../assets/images/banner-2.jpg";

function Menu_main({
	listSlide,
	listCategory,
	listSubCategory,
	fetchSlide,
	fetchCategory,
	fetchSubCategory,
}) {
	useEffect(() => {
		fetchSlide();
		fetchCategory();
		fetchSubCategory();
	}, []);

	const { data: dataSlide } = listSlide;
	const { data: dataCategory } = listCategory;
	const { data: dataSubCategory } = listSubCategory;
	return (
		<>
			<div className="menu-main">
				<ul className="list-menu">
					{dataCategory.map((cate) => {
						return (
							<li className="item-menu" key={cate._id}>
								<Link
									to={`/cate/${cate._id}`}
									className="path-menu"
								>
									<img
										src={`http://localhost:4000/api/category/img/${cate._id}`}
										alt=""
										className="img-menu"
									/>
									{cate.name}
								</Link>

								<ul className="sub-menu">
									{dataSubCategory.map((subCate) => {
										if (subCate.cateId === cate._id) {
											return (
												<li
													className="sub-menu__item"
													key={subCate._id}
												>
													<Link
														to={`/cate/${cate._id}/${subCate.name}`}
														className="link-sub-menu"
													>
														{subCate.name}
													</Link>
												</li>
											);
										} else {
											return false;
										}
									})}
								</ul>
							</li>
						);
					})}
				</ul>

				<div className="group-slide">
					<div
						id="carouselExampleCaptions"
						className="carousel slide"
						data-bs-ride="carousel"
					>
						<div className="carousel-inner">
							{dataSlide.map((slide, index) => {
								return (
									<div
										className={`carousel-item active`}
										key={slide._id}
									>
										<img
											src={`http://localhost:4000/api/slide/img/${slide._id}`}
											className="d-block w-100 img-slide-main"
											alt="..."
										/>
									</div>
								);
							})}
						</div>
						<button
							className="carousel-control-prev"
							type="button"
							data-bs-target="#carouselExampleCaptions"
							data-bs-slide="prev"
						>
							<span
								className="carousel-control-prev-icon"
								aria-hidden="true"
							/>
							<span className="visually-hidden">Previous</span>
						</button>
						<button
							className="carousel-control-next"
							type="button"
							data-bs-target="#carouselExampleCaptions"
							data-bs-slide="next"
						>
							<span
								className="carousel-control-next-icon"
								aria-hidden="true"
							/>
							<span className="visually-hidden">Next</span>
						</button>
					</div>
				</div>

				<div className="nav-banner">
					<a href="/#" className="nav-banner__box">
						<img
							src={banner1}
							alt=""
							className="nav-banner__box-img"
						/>
					</a>
					<a href="/#" className="nav-banner__box">
						<img
							src={banner2}
							alt=""
							className="nav-banner__box-img"
						/>
					</a>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		listSlide: state.slides,
		listCategory: state.categories,
		listSubCategory: state.subCategories,
	};
};

const mapActionToProps = {
	fetchSlide,
	fetchCategory,
	fetchSubCategory,
};
export default connect(mapStateToProps, mapActionToProps)(Menu_main);

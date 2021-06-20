import React from "react";
import { connect } from "react-redux";

import { lowToHight, hightToLow } from "./../../redux/actions/productAction";

const HeaderProductCate = ({
	nameCate,
	nameSubCate,
	lowToHight,
	hightToLow,
}) => {
	return (
		<div className="group-control">
			<ul className="breadcrumb-list">
				<li className="breadcrumb-list__item">
					<i className="fas fa-home"></i>Trang chủ
				</li>
				<span className="break">/</span>
				<li className="breadcrumb-list__item">
					{nameCate.name && nameCate.name}
				</li>
				{nameSubCate && (
					<>
						<span className="break">/</span>
						<li className="breadcrumb-list__item">{nameSubCate}</li>
					</>
				)}
			</ul>

			<div className="control-box">
				<div className="sort-price">
					<div className="sort-price__title">
						<span>Giá:</span>
						<i className="fas fa-chevron-down"></i>
					</div>
					<div className="sort-price__sub">
						<span
							className="ascending"
							onClick={() => lowToHight()}
						>
							Giá: Thấp đến cao
						</span>
						<span className="decrease" onClick={() => hightToLow()}>
							Giá: Cao đến thấp
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapActionToProps = {
	lowToHight,
	hightToLow,
};

export default connect(null, mapActionToProps)(HeaderProductCate);

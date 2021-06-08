import React from "react";
import PropTypes from "prop-types";

import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";
import DetailComment from "./DetailComment";

const DetailOverview = ({ product }) => {
	return (
		<>
			<div className="overview">
				<div className="overview__title">
					<i className="overview-icon fas fa-cogs"></i>
					Thông số kỹ thuật
				</div>
				<div className="row">
					<DetailLeft product={product} />
					<DetailRight product={product} />

					<DetailComment />
				</div>
			</div>
		</>
	);
};

// DetailOverview.propTypes = {

// }

export default DetailOverview;

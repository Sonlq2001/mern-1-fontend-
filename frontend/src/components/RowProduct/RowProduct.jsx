import React from "react";
import PropTypes from "prop-types";

import RowHeader from "./RowHeader";
import RowBanner from "./RowBanner";
import RowList from "./RowList";

const RowProduct = ({ category }) => {
	return (
		<>
			<div className="row-product">
				<RowHeader category={category} />
				<RowBanner />
				<RowList category={category} />
			</div>
		</>
	);
};

RowProduct.propTypes = {};

export default RowProduct;

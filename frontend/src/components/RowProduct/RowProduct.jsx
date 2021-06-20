import React from "react";

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

export default RowProduct;

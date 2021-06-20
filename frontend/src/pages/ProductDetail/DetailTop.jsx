import React from "react";

import DetailConfig from "./DetailConfig";
import DetailHotline from "./DetailHotline";

const DetailTop = ({ product }) => {
	return (
		<>
			<div className="detail-top">
				<div className="row">
					<div className="col col-lg-4 col-md-6 col-sm-12 col-12">
						<div className="box-img">
							<img
								src={`http://localhost:4000/api/product/img/${product._id}`}
								alt=""
								className="box-img__prd"
							/>
						</div>
					</div>

					<DetailConfig product={product} />
					<DetailHotline product={product} />
				</div>
			</div>
		</>
	);
};

export default DetailTop;

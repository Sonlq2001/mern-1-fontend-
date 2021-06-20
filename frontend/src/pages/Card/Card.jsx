import React from "react";

import TableCart from "./TableCart";
import HeaderProductCart from "./../Product/HeaderProductCate";

const Card = (props) => {
	return (
		<>
			<div className="main bgr">
				<div className="container">
					<div className="all-product">
						{/* <HeaderProductCart /> */}
						<div className="row mt-5">
							<TableCart disable={true} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// Card.propTypes = {

// }

export default Card;

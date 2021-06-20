import React from "react";
import NavbarCustomer from "./NavbarCustomer";

const FrameContent = ({ children, title, component }) => {
	return (
		<>
			<div className="group-customer">
				<div className="container">
					<div className="row-customer">
						<div className="row">
							<div className="col col-lg-3">
								<NavbarCustomer />
							</div>
							<div className="col col-lg-9 mt-5">
								<h3 className="title-model">{title}</h3>
								{component && component}
								<div className="box-model">{children}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FrameContent;

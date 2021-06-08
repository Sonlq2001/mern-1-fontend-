import React from "react";
// import PropTypes from "prop-types";

const Footer = (props) => {
	return (
		<>
			<footer className="footer">
				<div className="container pt-5 pb-5">
					<div className="row">
						<div className="col col-lg-3">
							<div className="box-footer">
								<h3 className="box-footer__title">
									chăm sóc khách hàng
								</h3>

								<ul className="list-footer">
									<li className="list-footer__item">
										<a href="">Trung Tâm Trợ Giúp</a>
									</li>
									<li className="list-footer__item">
										<a href="">Hướng Dẫn Mua Hàng</a>
									</li>
									<li className="list-footer__item">
										<a href="">Thanh Toán</a>
									</li>
									<li className="list-footer__item">
										<a href="">Trả Hàng và Hoàn Tiền</a>
									</li>
								</ul>
							</div>
						</div>

						<div className="col col-lg-3">
							<div className="box-footer">
								<h3 className="box-footer__title">Liên hệ</h3>

								<ul className="list-footer">
									<li className="list-footer__item">
										<i className="icon-footer fas fa-phone"></i>
										<span className="item-txt">
											0225.3 666 555
										</span>
									</li>
									<li className="list-footer__item">
										<i className="icon-footer far fa-envelope"></i>
										<span className="item-txt">
											sonweb2001@gmail.com
										</span>
									</li>
									<li className="list-footer__item">
										<i className="icon-footer fas fa-map-marker-alt"></i>
										<span className="item-txt">
											7/ 274A Lạch Tray - Ngô Quyền - HP
										</span>
									</li>
								</ul>
							</div>
						</div>

						<div className="col col-lg-3">
							<div className="box-footer">
								<h3 className="box-footer__title">Danh mục</h3>

								<ul className="list-footer">
									<li className="list-footer__item">
										<i className="icon-footer fas fa-phone"></i>
										<span className="item-txt">
											0225.3 666 555
										</span>
									</li>
									<li className="list-footer__item">
										<i className="icon-footer far fa-envelope"></i>
										<span className="item-txt">
											sonweb2001@gmail.com
										</span>
									</li>
									<li className="list-footer__item">
										<i className="icon-footer fas fa-map-marker-alt"></i>
										<span className="item-txt">
											7/ 274A Lạch Tray - Ngô Quyền - HP
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

// Footer.propTypes = {

// }

export default Footer;

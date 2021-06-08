import "./../../scss/components/fix_admin.scss";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { fetchSlide, removeSlide } from "./../../redux/actions/slideAction";
import slideApi from "../../api/slideApi";
import TableSlide from "./TableSlide";

import Loading from "./../../components/Loading";

const ListSlide = (props) => {
	const dispatch = useDispatch();
	const { data, loading } = useSelector((state) => state.slides);
	useEffect(() => {
		dispatch(fetchSlide());
	}, [dispatch]);

	if (loading) {
		return <Loading loading_admin="loading-admin" />;
	} else if (data.length > 0) {
		const handleRemove = (id) => {
			if (window.confirm("Bạn thực sự muốn xóa ?")) {
				dispatch(removeSlide(id));
			}
		};

		return (
			<>
				<div className="row bg-white pt-3">
					<h4 className="page-title mb-4">Danh sách slide</h4>
					<div className="row">
						<div className="col col-lg-2">
							<input
								type="text"
								className="form-control "
								placeholder="Tìm kiếm"
							/>
						</div>
						<div className="col col-lg-2">
							{/* <select
								className="form-select"
								aria-label="Default select example"
								value={""}
							>
								<option value="" selected>
									Xắp xếp theo
								</option>
								<option key={1} value={1}>
									One
								</option>
							</select> */}
						</div>
						<div className="col col-lg-8 text-end">
							<Link
								to="/admin/add-slide"
								className="btn btn-info"
							>
								<i className="fas fa-plus"></i>Thêm
							</Link>
						</div>
					</div>
				</div>
				<div className="row bg-white">
					<div className="col col-lg-12">
						{/* <div className="card-body">
							<h5 className="card-title mb-0">Static Table</h5>
						</div> */}
						<TableSlide data={data} handleRemove={handleRemove} />
					</div>
				</div>
			</>
		);
	} else {
		return null;
	}
};

// ListCategory.propTypes = {

// }

export default ListSlide;

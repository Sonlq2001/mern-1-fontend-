import "./../../scss/components/fix_admin.scss";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchSlide, removeSlide } from "./../../redux/actions/slideAction";
import TableSlide from "./TableSlide";
import Loading from "./../../components/Loading";
import NotFoundAdmin from "./../common/NotFoundAdmin";
import HeaderTable from "./../common/HeaderTable";

const ListSlide = ({ listSlide, fetchSlide, removeSlide }) => {
	const [valueSearch, setValueSearch] = useState("");
	useEffect(() => {
		fetchSlide();
	}, []);

	const { data: dataSlide, loading } = listSlide;

	if (loading) {
		return <Loading loading_admin="loading-admin" />;
	} else if (dataSlide.length > 0) {
		// remove
		const handleRemove = (id) => {
			if (window.confirm("Bạn thực sự muốn xóa ?")) {
				removeSlide(id);
			}
		};

		// filter
		const handleSearch = (e) => setValueSearch(e.target.value);
		const listFilter = dataSlide.filter((item) =>
			item.path.toLowerCase().includes(valueSearch.toLowerCase())
		);

		return (
			<>
				<HeaderTable
					title="Danh sách slide"
					path="/admin/add-slide"
					handleSearch={handleSearch}
				/>
				<div className="row bg-white fs-5">
					<div className="col col-lg-12">
						<TableSlide
							data={listFilter}
							handleRemove={handleRemove}
						/>
					</div>
				</div>
			</>
		);
	} else {
		return <NotFoundAdmin />;
	}
};

const mapStateToProps = (state) => {
	return {
		listSlide: state.slides,
	};
};

export default connect(mapStateToProps, { fetchSlide, removeSlide })(ListSlide);

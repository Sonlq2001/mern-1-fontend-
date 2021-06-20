import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
	fetchCategory,
	removeCategory,
} from "./../../redux/actions/categoryAction";
import Loading from "./../../components/Loading";
import TableCategory from "./TableCategory";
import NotFoundAdmin from "./../common/NotFoundAdmin";
import HeaderTable from "./../common/HeaderTable";
import PaginationList from "./../common/PaginationList";

const ListCategory = ({ listCategory, fetchCategory, removeCategory }) => {
	const [valueSearch, setValueSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const limit = 5;

	useEffect(() => {
		fetchCategory();
	}, []);

	const { data: dataCategory, loading } = listCategory;

	if (loading) {
		return <Loading loading_admin="loading-admin" />;
	} else if (dataCategory.length > 0) {
		// xóa
		const handleRemove = (id) => {
			if (window.confirm("Bạn thực sự muốn xóa !")) {
				removeCategory(id);
			}
		};

		// pagination
		const end = currentPage * limit;
		const start = end - limit;
		const dataSlice = dataCategory.slice(start, end);
		const paginate = (pageNumber) => setCurrentPage(pageNumber);
		const plus = () => setCurrentPage(currentPage + 1);
		const minus = () => setCurrentPage(currentPage - 1);

		// tìm kiếm
		const handleSearch = (e) => setValueSearch(e.target.value);
		const listFilter = dataSlice.filter((cate) =>
			cate.name.toLowerCase().includes(valueSearch.toLowerCase())
		);

		return (
			<>
				<HeaderTable
					title="Danh sách danh mục"
					path="/admin/add-category"
					handleSearch={handleSearch}
				/>
				<div className="row bg-white fs-5">
					<div className="col col-lg-12">
						<TableCategory
							data={listFilter}
							handleRemove={handleRemove}
						/>
					</div>
					<PaginationList
						total={dataCategory.length}
						limit={5}
						plus={plus}
						minus={minus}
						paginate={paginate}
						currentPage={currentPage}
					/>
				</div>
			</>
		);
	} else {
		return (
			<NotFoundAdmin
				title="Hiện tại chưa có dữ liệu danh mục nào nào"
				path=""
			/>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		listCategory: state.categories,
	};
};

export default connect(mapStateToProps, { fetchCategory, removeCategory })(
	ListCategory
);

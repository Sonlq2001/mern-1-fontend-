import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchCategory } from "./../../redux/actions/categoryAction";
import {
	fetchSubCategory,
	removeSubCategory,
} from "./../../redux/actions/subCategoryAction";
import Loading from "./../../components/Loading";
import TableSubCategory from "./TableSubCategory";
import HeaderTable from "./../common/HeaderTable";
import NotFoundAdmin from "./../common/NotFoundAdmin";
import PaginationList from "./../common/PaginationList";

const ListSubCategory = ({
	listCategory,
	listSubCategory,
	fetchSubCategory,
	fetchCategory,
	removeSubCategory,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const limit = 6;
	const [valueSearch, setValueSearch] = useState("");
	useEffect(() => {
		fetchCategory();
		fetchSubCategory();
	}, []);

	const { data: dataCategory } = listCategory;
	const { data: dataSubCategory, loading } = listSubCategory;

	if (loading) {
		return <Loading loading_admin="loading-admin" />;
	} else if (dataCategory.length > 0 && dataSubCategory.length > 0) {
		// xóa
		const handleRemove = (id) => {
			if (window.confirm("Bạn thực sự muốn xóa !")) {
				removeSubCategory(id);
			}
		};

		// pagination
		const end = currentPage * limit;
		const start = end - limit;
		const dataSlice = dataSubCategory.slice(start, end);
		const paginate = (page) => setCurrentPage(page);
		const plus = () => setCurrentPage(currentPage + 1);
		const minus = () => setCurrentPage(currentPage - 1);

		// handle search
		const handleSearch = (e) => {
			setValueSearch(e.target.value);
		};
		// filter item
		const filterItem = dataSlice.filter((item) => {
			return item.name.toLowerCase().includes(valueSearch.toLowerCase());
		});

		return (
			<>
				<HeaderTable
					title="Danh sách danh mục con"
					path="/admin/action-subcategory"
					handleSearch={handleSearch}
				/>

				<div className="row bg-white fs-5">
					<div className="col col-lg-12">
						<TableSubCategory
							subCategories={filterItem}
							categories={dataCategory}
							handleRemove={handleRemove}
						/>
					</div>

					<PaginationList
						total={dataSubCategory.length}
						limit={limit}
						plus={plus}
						minus={minus}
						paginate={paginate}
						currentPage={currentPage}
					/>
				</div>
			</>
		);
	} else {
		return <NotFoundAdmin />;
	}
};

const mapStateToProps = (state) => {
	return {
		listCategory: state.categories,
		listSubCategory: state.subCategories,
	};
};

const mapActionToProps = {
	fetchCategory,
	fetchSubCategory,
	removeSubCategory,
};

export default connect(mapStateToProps, mapActionToProps)(ListSubCategory);

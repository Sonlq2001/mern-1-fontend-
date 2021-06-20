import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
	fetchProduct,
	removeProduct,
	filterCate,
} from "./../../redux/actions/productAction";
import { fetchCategory } from "./../../redux/actions/categoryAction";

import HeaderTable from "./../common/HeaderTable";
import TableProduct from "./TableProduct";
import Loading from "./../../components/Loading";
import PaginationList from "./../common/PaginationList";
import NotFoundAdmin from "./../common/NotFoundAdmin";

const ListProduct = ({
	listProduct,
	fetchProduct,
	removeProduct,
	filterCate,
	listCategory,
	fetchCategory,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [valueSearch, setValueSearch] = useState("");
	const [valueSelect, setValueSelect] = useState("");

	const limit = 5;
	useEffect(() => {
		fetchProduct();
		fetchCategory();
	}, []);

	const handleSelect = (e) => setValueSelect(e.target.value);
	useEffect(() => {
		if (valueSelect !== "") {
			filterCate(valueSelect);
		}
	}, [valueSelect]);

	const { data: dataProduct, loading } = listProduct;
	if (loading) {
		return <Loading loading_admin="loading-admin" />;
	} else if (dataProduct.length > 0) {
		// pagination
		const end = currentPage * limit;
		const start = end - limit;
		const dataSlice = dataProduct.slice(start, end);
		const paginate = (pageNumber) => setCurrentPage(pageNumber);
		const minus = () => setCurrentPage(currentPage - 1);
		const plus = () => setCurrentPage(currentPage + 1);

		// // xóa
		const handleRemove = async (id) => {
			if (window.confirm("Bạn thật sự muốn xóa ?")) {
				removeProduct(id);
			}
		};

		// filter
		const handleSearch = (e) => setValueSearch(e.target.value);
		const listFilter = dataSlice.filter((product) =>
			product.name.toLowerCase().includes(valueSearch.toLowerCase())
		);

		// select

		return (
			<>
				<HeaderTable
					title="Danh sách sản phẩm"
					path="/admin/add-product"
					handleSearch={handleSearch}
					handleSelect={handleSelect}
					data={listCategory.data}
				/>
				<div className="row bg-white fs-5">
					<div className="col col-lg-12">
						<TableProduct
							dataProduct={listFilter}
							handleRemove={handleRemove}
						/>
					</div>
					<PaginationList
						limit={limit}
						total={dataProduct.length}
						paginate={paginate}
						currentPage={currentPage}
						minus={minus}
						plus={plus}
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
		listProduct: state.products,
		listCategory: state.categories,
	};
};

const mapActionToProps = {
	fetchProduct,
	removeProduct,
	filterCate,
	fetchCategory,
};

export default connect(mapStateToProps, mapActionToProps)(ListProduct);

import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCategory } from "./../../redux/actions/categoryAction";
import {
	fetchSubCategory,
	addSubCategory,
	updateSubCategory,
} from "./../../redux/actions/subCategoryAction";
import Loading from "./../../components/Loading";
import InPutField from "./../../customField/InputField";
import SelectField from "./../../customField/SelectField";

const FormSubCategory = ({
	listCategory,
	listSubCate,
	fetchSubCategory,
	fetchCategory,
	addSubCategory,
	updateSubCategory,
}) => {
	let history = useHistory();
	const { id } = useParams();

	useEffect(() => {
		fetchCategory();
		fetchSubCategory();
	}, []);

	const { data: dataCategory } = listCategory;
	const { data: dataSubCategory, loading } = listSubCate;

	if (loading) {
		return <Loading />;
	} else {
		const convertCate = dataCategory.map((cate) => {
			return {
				value: cate._id,
				label: cate.name,
			};
		});

		let initialValues;
		if (id) {
			const subCateEdit = dataSubCategory.find(
				(subCate) => subCate._id === id
			);
			initialValues = {
				cateId: subCateEdit.cateId,
				name: subCateEdit.name,
			};
		} else {
			initialValues = { cateId: "", name: "" };
		}
		return (
			<>
				<Formik
					initialValues={initialValues}
					onSubmit={async (values) => {
						if (id === undefined) {
							addSubCategory(values);
							history.push("/admin/subcategory");
						} else {
							updateSubCategory(id, values);
							history.push("/admin/subcategory");
						}
					}}
					validationSchema={Yup.object().shape({
						cateId: Yup.string().required(
							"Không được để trống tên danh mục cha"
						),
						name: Yup.string().required(
							"Không được để trống tên danh mục con"
						),
					})}
				>
					{(props) => {
						return (
							<>
								<div className="row bg-white">
									<div className="col col-lg-12 pt-3">
										<div className="card-body">
											{id && (
												<>
													<h4 className="card-title">
														Sửa danh mục con:
														<mark className="ms-3">
															{initialValues.name}
														</mark>
													</h4>
												</>
											)}

											{!id && (
												<h4 className="card-title">
													Thêm danh mục con
												</h4>
											)}
										</div>
									</div>
								</div>
								<Form className="row bg-white">
									<div className="col-md-6">
										<div className="card-body">
											<SelectField
												label="Danh mục cha"
												name="cateId"
												options={convertCate}
												classLabel="fs-5"
											/>
											<InPutField
												label="Tên danh mục con"
												type="text"
												name="name"
												placeholder="Tên"
												className="form-control fs-5"
												classLabel="fs-5"
											/>
										</div>
									</div>
									<div className="col col-lg-12">
										<div className="card-body">
											{id && (
												<button className="btn btn-info fs-5">
													Sửa danh mục
												</button>
											)}

											{!id && (
												<button className="btn btn-info fs-5">
													Thêm danh mục
												</button>
											)}
										</div>
									</div>
								</Form>
							</>
						);
					}}
				</Formik>
			</>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		listCategory: state.categories,
		listSubCate: state.subCategories,
	};
};

const mapActionToProps = {
	fetchCategory,
	fetchSubCategory,
	addSubCategory,
	updateSubCategory,
};

export default connect(mapStateToProps, mapActionToProps)(FormSubCategory);

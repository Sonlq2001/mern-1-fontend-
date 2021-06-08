import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategory } from "./../../redux/actions/categoryAction";
import {
	fetchSubCategory,
	addSubCategory,
	updateSubCategory,
} from "./../../redux/actions/subCategoryAction";
import Loading from "./../../components/Loading";
import InPutField from "./../../customField/InputField";
import SelectField from "./../../customField/SelectField";

const FormSubCategory = (props) => {
	let history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();

	const {
		categories: { data },
		subCategories: { data: listSubCate, loading },
	} = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchCategory());
		dispatch(fetchSubCategory());
	}, []);

	// console.log(initialValues);
	// convert

	if (loading) {
		return <Loading />;
	} else {
		const convertCate = data.map((cate) => {
			return {
				value: cate._id,
				label: cate.name,
			};
		});

		let initialValues;
		if (id) {
			const subCateEdit = listSubCate.find(
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
							dispatch(addSubCategory(values));
							history.push("/admin/subcategory");
						} else {
							dispatch(updateSubCategory(id, values));
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
											<h4 className="card-title">
												Thêm danh mục con
											</h4>
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
												classLabel=""
											/>
											<InPutField
												label="Tên danh mục con"
												type="text"
												name="name"
												placeholder="Tên"
												className="form-control"
											/>
										</div>
									</div>
									<div className="col col-lg-12">
										<div className="card-body">
											<button className="btn btn-info">
												Thêm danh mục
											</button>
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

// AddCategory.propTypes = {

// }

export default FormSubCategory;

import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Formik, Form, FastField, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addProduct } from "./../../redux/actions/productAction";
import { fetchCategory } from "./../../redux/actions/categoryAction";
import { fetchSubCategory } from "./../../redux/actions/subCategoryAction";

import InPutField from "./../../customField/InputField";
import SelectField from "./../../customField/SelectField";
import FileField from "./../../customField/FileField";
import TextareaField from "./../../customField/TextareaField";
// import RadioField from "./../../customField/RadioField";
import CheckboxField from "./../../customField/CheckboxField";

import {
	GUARANTEE,
	LIST_CATEGORY,
	LIST_SUBCATEGORY,
} from "../../constants/constants";

const AddProduct = (props) => {
	const history = useHistory();

	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					name: "",
					cateId: "",
					subCateId: "",
					price: "",
					sale: "",
					photo: "",
					guarantee: "",
					// type: "0",
					description: "",
					status: "",
				}}
				onSubmit={(values) => {
					const formProduct = new FormData();
					formProduct.append("cateId", values.cateId);
					formProduct.append("subCateId", values.subCateId);
					formProduct.append("name", values.name);
					formProduct.append("price", values.price);
					formProduct.append("sale", values.sale);
					formProduct.append("guarantee", values.guarantee);
					formProduct.append("photo", values.photo);
					// formProduct.append("type", values.type);
					formProduct.append("description", values.description);
					formProduct.append("status", values.status);

					dispatch(addProduct(formProduct));
					history.push("/admin/product");
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required(
						"Không được để trống tên sản phẩm"
					),
					cateId: Yup.string().required("Chưa chọn danh mục"),
					subCateId: Yup.string().required("Chưa chọn thương hiệu"),
					price: Yup.number()
						.positive("Không được để giá trị âm")
						.required("Không được để trống giá sản phẩm"),
					sale: Yup.number()
						.positive("Không được để giá trị âm")
						.max(100),
					guarantee: Yup.string().required(
						"Chưa chọn thời gian bảo hành"
					),
					photo: Yup.string().required("Chưa chọn ảnh"),
					description: Yup.string().required("Chưa nhập mô tả"),
					status: Yup.string().required("Vui lòng chọn trạng thái"),
				})}
			>
				{(props) => {
					return (
						<>
							<div className="row bg-white">
								<div className="col col-lg-12 pt-3">
									<div className="card-body">
										<h4 className="card-title">
											Thêm sản phẩm
										</h4>
									</div>
								</div>
							</div>
							<Form className="row bg-white">
								<div className="col-md-6">
									<div className="card-body">
										<SelectField
											label="Danh mục"
											name="cateId"
											options={LIST_CATEGORY()}
										/>

										<SelectField
											label="Thương hiệu"
											name="subCateId"
											options={LIST_SUBCATEGORY()}
										/>

										<InPutField
											label="Tên"
											type="text"
											name="name"
											placeholder="Tên"
											className="form-control"
										/>

										<InPutField
											label="Giá"
											type="number"
											name="price"
											placeholder="Giá"
											className="form-control"
										/>

										<InPutField
											label="Giá sale"
											type="number"
											name="sale"
											placeholder="Giá sale"
											className="form-control"
										/>
									</div>
								</div>

								<div className="col-6">
									<div className="card-body">
										<FastField
											component={FileField}
											type="file"
											name="photo"
											label="Ảnh"
										/>

										<SelectField
											label="Thời gian bảo hành"
											name="guarantee"
											options={GUARANTEE()}
										/>

										<div className="form-group mt-3">
											<label htmlFor="" className="block">
												Mô tả chi tiết
											</label>
											<FastField
												component={TextareaField}
												name="description"
												value=""
											/>
										</div>

										<Field
											component={CheckboxField}
											label="Trạng thái"
											classLabel="form-check-label mb-0"
											type="checkbox"
											className="form-check-input"
											id="status"
											name="status"
										/>
									</div>
								</div>

								<div className="col col-lg-12">
									<div className="card-body text-end">
										<button className="btn btn-info">
											Thêm sản phẩm
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
};

// AddProduct.propTypes = {

// }

export default AddProduct;

import React, { useContext } from "react";
// import PropTypes from "prop-types";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addCategory } from "./../../redux/actions/categoryAction";
import InPutField from "./../../customField/InputField";
import FileField from "./../../customField/FileField";

const AddCategory = (props) => {
	let history = useHistory();
	const dispatch = useDispatch();
	return (
		<>
			<Formik
				initialValues={{
					name: "",
					photo: "",
				}}
				onSubmit={async (values) => {
					const formCate = new FormData();
					formCate.append("name", values.name);
					formCate.append("photo", values.photo);

					dispatch(addCategory(formCate));
					history.push("/admin/category");
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required(
						"Không được để trống tên danh mục"
					),
					photo: Yup.string().required("Chưa chọn ảnh"),
				})}
			>
				{(props) => {
					return (
						<>
							<div className="row bg-white">
								<div className="col col-lg-12 pt-3">
									<div className="card-body">
										<h4 className="card-title">
											Thêm danh mục
										</h4>
									</div>
								</div>
							</div>
							<Form className="row bg-white">
								<div className="col-md-6">
									<div className="card-body">
										<InPutField
											label="Tên"
											type="text"
											name="name"
											placeholder="Tên"
											className="form-control"
										/>

										<FastField
											component={FileField}
											type="file"
											name="photo"
											label="Ảnh"
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
};

// AddCategory.propTypes = {

// }

export default AddCategory;

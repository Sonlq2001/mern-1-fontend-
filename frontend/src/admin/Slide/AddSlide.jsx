import React, { useContext } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { addSlide } from "./../../redux/actions/slideAction";
import InPutField from "./../../customField/InputField";
import FileField from "./../../customField/FileField";

const AddSlide = (props) => {
	let history = useHistory();
	const dispatch = useDispatch();
	return (
		<>
			<Formik
				initialValues={{
					path: "",
					photo: "",
				}}
				onSubmit={async (values) => {
					const formSlide = new FormData();
					formSlide.append("path", values.path);
					formSlide.append("photo", values.photo);

					dispatch(addSlide(formSlide));
					history.push("/admin/slide");
				}}
				validationSchema={Yup.object().shape({
					path: Yup.string().required(
						"Vui lòng nhập đường dẫn liên kết !"
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
											Thêm slide
										</h4>
									</div>
								</div>
							</div>
							<Form className="row bg-white">
								<div className="col-md-6">
									<div className="card-body">
										<InPutField
											label="Đường dẫn liên kết"
											type="text"
											name="path"
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
											Thêm
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

export default AddSlide;

import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { addSlide } from "./../../redux/actions/slideAction";
import InPutField from "./../../customField/InputField";
import FileField from "./../../customField/FileField";

const AddSlide = ({ addSlide }) => {
	let history = useHistory();

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

					addSlide(formSlide);
					history.push("/admin/slide");
				}}
				validationSchema={Yup.object().shape({
					path: Yup.string().required(
						"Vui lòng nhập đường dẫn liên kết !"
					),
					photo: Yup.string().required("Chưa chọn ảnh !"),
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
											classLabel="fs-5"
											type="text"
											name="path"
											placeholder="Tên"
											className="form-control fs-5"
										/>

										<FastField
											component={FileField}
											classLabel="fs-5"
											type="file"
											name="photo"
											label="Ảnh"
											className="form-control fs-5"
										/>
									</div>
								</div>
								<div className="col col-lg-12">
									<div className="card-body">
										<button className="btn btn-info fs-5">
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

export default connect(null, { addSlide })(AddSlide);

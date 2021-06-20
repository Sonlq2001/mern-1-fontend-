import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { fetchSlide, updateSlide } from "./../../redux/actions/slideAction";
import Loading from "./../../components/Loading";
import InPutField from "./../../customField/InputField";
import FileField from "./../../customField/FileField";

const EditSlide = ({ listSlide, fetchSlide, updateSlide }) => {
	let history = useHistory();
	const { id } = useParams();
	useEffect(() => {
		fetchSlide();
	}, []);

	const { data: dataSlide, loading } = listSlide;

	if (loading) {
		return <Loading />;
	} else {
		const slideEdit = dataSlide.find((slide) => slide._id === id);
		return (
			<Formik
				initialValues={{
					path: slideEdit.path,
					photo: "",
				}}
				onSubmit={async (values) => {
					const formSlide = new FormData();
					formSlide.append("path", values.path);
					if (values.photo) {
						formSlide.append("photo", values.photo);
					}

					updateSlide(id, formSlide);
					history.push("/admin/slide");
				}}
				validationSchema={Yup.object().shape({
					path: Yup.string().required(
						"Vui lòng nhập đường dẫn liên kết !"
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
											Thêm user
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
											className="form-control fs-5"
											classLabel="fs-5"
										/>

										<FastField
											component={FileField}
											type="file"
											name="photo"
											label="Ảnh"
											classLabel="fs-5"
											className="form-control fs-5"
										/>
										<img
											src={`http://localhost:4000/api/slide/img/${slideEdit._id}`}
											alt=""
											className="img-slide"
										/>
									</div>
								</div>
								<div className="col col-lg-12">
									<div className="card-body">
										<button className="btn btn-info fs-5">
											Sửa
										</button>
									</div>
								</div>
							</Form>
						</>
					);
				}}
			</Formik>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		listSlide: state.slides,
	};
};

export default connect(mapStateToProps, { fetchSlide, updateSlide })(EditSlide);

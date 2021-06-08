import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
	fetchSlide,
	updateSlide,
	fetchOne,
} from "./../../redux/actions/slideAction";
import slideApi from "./../../api/slideApi";
import Loading from "./../../components/Loading";
import InPutField from "./../../customField/InputField";
import FileField from "./../../customField/FileField";

const EditSlide = (props) => {
	let history = useHistory();
	const { id } = useParams();
	const { data, loading } = useSelector((state) => state.slides);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSlide());
	}, [dispatch]);

	if (loading) {
		return <Loading />;
	} else {
		const slideEdit = data.find((slide) => slide._id == id);
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

					dispatch(updateSlide(id, formSlide));
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
										{/* <img
											src={`http://localhost:4000/api/slide/img/${slideEdit._id}`}
											alt=""
											className="img-slide"
										/> */}
									</div>
								</div>
								<div className="col col-lg-12">
									<div className="card-body">
										<button className="btn btn-info">
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

// AddCategory.propTypes = {

// }

export default EditSlide;

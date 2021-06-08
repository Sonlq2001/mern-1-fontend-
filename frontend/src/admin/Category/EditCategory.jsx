import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
	fetchCategory,
	updateCategory,
} from "./../../redux/actions/categoryAction";
import InPutField from "./../../customField/InputField";
import FileField from "./../../customField/FileField";

const EditCategory = (props) => {
	let history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();

	const { data, loading } = useSelector((state) => state.categories);
	useEffect(() => {
		dispatch(fetchCategory());
	}, [dispatch]);

	if (loading) {
		return (
			<div className="loading">
				<div className="loading__round"></div>
			</div>
		);
	} else if (data.length > 0) {
		const editCate = data.find((cate) => cate._id === id);
		let initialValues = {
			name: editCate.name,
			photo: "",
		};
		return (
			<>
				<Formik
					initialValues={initialValues}
					onSubmit={async (values) => {
						const formCate = new FormData();
						formCate.append("name", values.name);
						if (values.photo) {
							formCate.append("photo", values.photo);
						}

						dispatch(updateCategory(id, formCate));
						history.push("/admin/category");
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string().required(
							"Không được để trống tên danh mục"
						),
						// photo: Yup.string().required("Chưa chọn ảnh"),
					})}
				>
					{(props) => {
						return (
							<>
								<div className="row bg-white">
									<div className="col col-lg-12 pt-3">
										<div className="card-body">
											<h4 className="card-title">
												Sửa danh mục
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
												value="son"
												className="form-control"
											/>

											<FastField
												component={FileField}
												type="file"
												name="photo"
												label="Ảnh"
											/>
											<img
												src={`http://localhost:4000/api/category/img/${id}`}
												alt=""
												className="img-cate"
											/>
										</div>
									</div>
									<div className="col col-lg-12">
										<div className="card-body">
											<button className="btn btn-info">
												Sửa danh mục
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
	// } else {
	// 	return "";
	// }
};

// AddCategory.propTypes = {

// }

export default EditCategory;

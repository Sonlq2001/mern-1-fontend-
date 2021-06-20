import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
	fetchUser,
	addUser,
	updateUser,
} from "./../../redux/actions/userActions";
import InputField from "./../../customField/InputField";
import RadioField from "./../../customField/RadioField";
import Loading from "./../../components/Loading";

const FormUser = ({ listUser, fetchUser, addUser, updateUser }) => {
	const history = useHistory();
	const { id } = useParams();

	useEffect(() => {
		fetchUser();
	}, []);

	let initialValues;
	if (id) {
		const { data, loading } = listUser;
		if (loading) {
			return <Loading />;
		} else {
			const userEdit = data.find((user) => user._id === id);
			const { name, email, password, role } = userEdit;
			initialValues = {
				name,
				email,
				password: "",
				role,
			};
		}
	} else {
		initialValues = {
			name: "",
			email: "",
			password: "",
			role: "0",
		};
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				name: Yup.string().required("Vui lòng nhập họ và tên !"),
				email: Yup.string()
					.required("Vui lòng nhập địa chỉ email !")
					.email("Địa chỉ email không chính xác !"),
				password: Yup.string()
					.required("Vui lòng nhập mật khẩu !")
					.min(6),
			})}
			onSubmit={(values) => {
				if (id) {
					updateUser(id, values);
					history.push("/admin/user");
				} else {
					addUser(values);
					history.push("/admin/user");
				}
			}}
		>
			{(props) => {
				return (
					<>
						<div className="row bg-white">
							<div className="col col-lg-12 pt-3">
								<div className="card-body">
									{id ? (
										<h4 className="card-title">
											Sửa user{" "}
											<mark>{initialValues.name}</mark>
										</h4>
									) : (
										<h4 className="card-title">
											Thêm user
										</h4>
									)}
								</div>
							</div>
						</div>
						<Form className="row bg-white">
							<div className="col-md-6">
								<div className="card-body">
									<InputField
										label="Họ và tên"
										placeholder="Họ và tên"
										type="text"
										className="form-control fs-5"
										name="name"
										classLabel="fs-5"
									/>
									<InputField
										label="Địa chỉ email"
										placeholder="Email"
										type="text"
										className="form-control fs-5"
										name="email"
										classLabel="fs-5"
									/>
									<InputField
										label="Mật khẩu"
										placeholder="Mật khẩu"
										type="text"
										className="form-control fs-5"
										name="password"
										classLabel="fs-5"
									/>
									<div className="d-flex">
										<RadioField
											label="Khách hàng"
											type="radio"
											name="role"
											className="form-check-input fs-5"
											value="0"
											id="user"
											classLabel="ms-2 fs-5"
										/>
										<RadioField
											label="Nhân viên"
											type="radio"
											name="role"
											className="form-check-input ms-4 fs-5"
											value="1"
											id="member"
											classLabel="ms-2 fs-5"
										/>
									</div>
								</div>
							</div>
							<div className="col col-lg-12">
								<div className="card-body">
									<button className="btn btn-info">
										{id ? "Sửa user " : "Thêm user"}
									</button>
								</div>
							</div>
						</Form>
					</>
				);
			}}
		</Formik>
	);
};

const mapStateToProps = (state) => {
	return {
		listUser: state.users,
	};
};

const mapActionToProps = {
	addUser,
	updateUser,
	fetchUser,
};
export default connect(mapStateToProps, mapActionToProps)(FormUser);

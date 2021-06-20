import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchUser, removeUser } from "./../../redux/actions/userActions";
import HeaderTable from "./../common/HeaderTable";
import TableUser from "./../User/TableUser";
import Loading from "./../../components/Loading";
import NotFoundAdmin from "./../common/NotFoundAdmin";

const ListUser = ({ listUser, fetchUser, removeUser }) => {
	const [valueSearch, setValueSearch] = useState("");
	useEffect(() => {
		fetchUser();
	}, []);
	const { data, loading } = listUser;

	if (loading) {
		return <Loading loading_admin="loading-admin" />;
	} else if (data.length > 0) {
		// remove
		const handleRemove = (id) => {
			if (window.confirm("Bạn thực xự muốn xóa !")) {
				removeUser(id);
			}
		};

		// filter
		const handleSearch = (e) => setValueSearch(e.target.value);
		const listFilter = data.filter((user) =>
			user.name.toLowerCase().includes(valueSearch.toLowerCase())
		);

		return (
			<>
				<HeaderTable
					title="Danh sách user"
					path="/admin/add-user"
					handleSearch={handleSearch}
				/>
				<div className="row bg-white fs-5">
					<div className="col col-lg-12">
						<TableUser
							dataUser={listFilter}
							handleRemove={handleRemove}
						/>
					</div>
				</div>
			</>
		);
	} else {
		return <NotFoundAdmin />;
	}
};

const mapStateToProps = (state) => {
	return {
		listUser: state.users,
	};
};

const mapActionToProps = {
	fetchUser,
	removeUser,
};

export default connect(mapStateToProps, mapActionToProps)(ListUser);

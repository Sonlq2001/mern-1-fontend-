import React from "react";
import { Link } from "react-router-dom";

const TableUser = ({ dataUser, handleRemove }) => {
	return (
		<>
			<table className="table table-bordered mt-5">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Họ và tên</th>
						<th scope="col">Địa chỉ email</th>
						<th scope="col">Vai trò</th>
						<th scope="col">Thao tác</th>
					</tr>
				</thead>
				<tbody>
					{dataUser.map((user, index) => {
						let roleMember = "";
						switch (user.role) {
							case 0:
								roleMember = "Khách hàng";
								break;
							case 1:
								roleMember = "Nhân viên";
								break;
							default:
								roleMember = "Khách hàng";
						}
						return (
							<tr key={user._id}>
								<th scope="row">{index + 1}</th>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									<strong>{roleMember}</strong>
								</td>
								<td>
									<Link
										to={`/admin/edit-user/${user._id}`}
										className="btn btn-primary me-3 fs-5"
									>
										Sửa
									</Link>
									<button
										className="btn btn-danger fs-5"
										onClick={() => handleRemove(user._id)}
									>
										Xóa
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default TableUser;

import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage, useField } from "formik";

const FileField = (props) => {
	const { field, form, type, label } = props;
	const { name, value, onBlur } = field;

	const changeImageUrl = (e) => {
		const newImageUrl = e.target.files[0];
		form.setFieldValue(name, newImageUrl);
	};

	return (
		<>
			<div className="form-group">
				{label && <label htmlFor="">Ảnh</label>}
				<input
					type={type}
					className="form-control"
					// value={value}
					onChange={changeImageUrl}
					onBlur={onBlur}
				/>
				<ErrorMessage
					component="div"
					className="error-select"
					name={name}
				/>
			</div>
		</>
	);
};

// FileField.propTypes = {

// }

export default FileField;

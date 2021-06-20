import React from "react";
import { ErrorMessage } from "formik";

const FileField = (props) => {
	const { field, form, type, label, classLabel, className } = props;
	const { name, onBlur } = field;

	const changeImageUrl = (e) => {
		const newImageUrl = e.target.files[0];
		form.setFieldValue(name, newImageUrl);
	};

	return (
		<>
			<div className="form-group">
				{label && (
					<label htmlFor="" className={classLabel && classLabel}>
						Ảnh
					</label>
				)}
				<input
					type={type}
					className={className && className}
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

export default FileField;

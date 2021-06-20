import React from "react";
import { ErrorMessage, useField } from "formik";

const InputField = (props) => {
	const {
		label,
		type,
		name,
		placeholder,
		className,
		id,
		classLabel,
		classError,
		show,
	} = props;
	const [field, meta] = useField(props);

	return (
		<>
			<div className="form-group">
				{label && (
					<label htmlFor={id} className={classLabel}>
						{label}
					</label>
				)}
				<input
					className={`${className} ${
						meta.touched && meta.error && "is-invalid"
					}`}
					{...field}
					type={type}
					placeholder={placeholder}
					id={id}
				/>
				{show && <i className="show-pwd fas fa-eye-slash"></i>}
				<ErrorMessage
					component="div"
					name={name}
					className={`invalid-feedback ${
						classError ? classError : ""
					}`}
				/>
			</div>
		</>
	);
};

export default InputField;

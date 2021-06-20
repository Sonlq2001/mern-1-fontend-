import React from "react";
import { ErrorMessage } from "formik";

const CheckboxField = (props) => {
	const { field, type, label, classLabel, className, id } = props;
	return (
		<>
			<div className="form-check">
				<input type={type} className={className} id={id} {...field} />
				{label && (
					<label className={classLabel} htmlFor={id}>
						{label}
					</label>
				)}
				<ErrorMessage
					component="div"
					name={field.name}
					className="invalid-feedback"
				/>
			</div>
		</>
	);
};

// CheckboxField.propTypes = {

// }

export default CheckboxField;

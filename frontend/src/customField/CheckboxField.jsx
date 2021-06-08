import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const CheckboxField = (props) => {
	const { field, form, type, label, classLabel, className, id } = props;
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

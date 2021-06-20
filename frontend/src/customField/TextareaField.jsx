import React from "react";
import { ErrorMessage } from "formik";
import ReactQuill from "react-quill";
const TextareaField = (props) => {
	const { field, form } = props;

	const handleEditor = (value) => {
		form.setFieldValue(field.name, value);
	};

	return (
		<>
			<ReactQuill
				onChange={handleEditor}
				value={field.value}

				// name={field.name}
				// onBlur={field.onBlur}
			/>
			<ErrorMessage
				component="div"
				name={field.name}
				className="error-select"
			/>
		</>
	);
};

export default TextareaField;

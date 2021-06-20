import React from "react";
import Formik, { useField } from "formik";

const RadioField = (props) => {
	const [field, meta] = useField(props);
	return (
		<>
			<div className="group-form">
				<input
					type={props.type}
					name={props.name}
					value={props.value}
					className={props.className}
					id={props.id}
					{...field}
					// checked={value == "0" ? true : false}
				/>
				{props.element && props.element}
				{props.label && (
					<label htmlFor={props.id} className={props.classLabel}>
						{props.label}
					</label>
				)}
			</div>
		</>
	);
};

export default RadioField;

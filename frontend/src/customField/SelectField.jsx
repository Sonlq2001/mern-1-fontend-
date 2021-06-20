import React from "react";

import Select from "react-select";
import { ErrorMessage, useField } from "formik";

const SelectField = (props) => {
	const { label, name, options, classLabel } = props;
	const [field] = useField(props);

	const valueSelected = options.find(
		(option) => option.value === field.value
	);

	const optionChange = (selected) => {
		const option = selected ? selected.value : selected;
		const valueOption = {
			target: {
				name: field.name,
				value: option,
			},
		};

		field.onChange(valueOption);
	};

	return (
		<>
			<div className="form-group">
				{label && (
					<label htmlFor="hue-demo" className={classLabel}>
						{label}
					</label>
				)}
				<Select
					options={options}
					onChange={optionChange}
					value={valueSelected}
				/>

				<ErrorMessage
					component="div"
					name={name}
					className="error-select"
				/>
			</div>
		</>
	);
};

// SelectField.propTypes = {

// }

export default SelectField;

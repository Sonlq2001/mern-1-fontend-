import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "./../redux/actions/categoryAction";
import { fetchSubCategory } from "./../redux/actions/subCategoryAction";

export const GUARANTEE = () => {
	let time = [];
	for (let i = 1; i <= 12; i++) {
		let month = { value: i, label: `${i} tháng` };
		time.push(month);
	}
	return time;
};

export const LIST_CATEGORY = () => {
	const {
		categories: { data },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCategory());
	}, []);
	const handleCategory = data.map((cate) => ({
		value: cate._id,
		label: cate.name,
	}));
	return handleCategory;
};

export const LIST_SUBCATEGORY = () => {
	const {
		subCategories: { data },
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSubCategory());
	}, []);
	const handleSubCategory = data.map((subCate) => ({
		value: subCate._id,
		label: subCate.name,
	}));
	return handleSubCategory;
};

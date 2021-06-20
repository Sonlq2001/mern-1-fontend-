import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchCategory } from "./../../redux/actions/categoryAction";
import Menu_main from "./../../components/Header/Menu_main";
import Banner_main from "./../../components/Banner_main/Banner_main";
import RowProduct from "./../../components/RowProduct/RowProduct";
import Loading from "./../../components/Loading";
const Home = ({ data: { data, loading }, fetchCategory }) => {
	window.scrollTo(0, 0);
	useEffect(() => {
		fetchCategory();
	}, [fetchCategory]);

	return (
		<div className="container">
			<Menu_main />
			<Banner_main />
			<div className="main">
				{!loading && (
					<>
						<RowProduct category={data[0]} />
						<RowProduct category={data[1]} />
					</>
				)}

				{loading && <Loading />}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.categories,
	};
};

const mapActionToProps = {
	fetchCategory,
};

export default connect(mapStateToProps, mapActionToProps)(Home);

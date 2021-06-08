import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { fetchCategory } from "./../../redux/actions/categoryAction";
import Menu_main from "./../../components/Header/Menu_main";
import Banner_main from "./../../components/Banner_main/Banner_main";
import RowProduct from "./../../components/RowProduct/RowProduct";
import Loading from "./../../components/Loading";
const Home = (props) => {
	window.scrollTo(0, 0);
	const { data, loading } = useSelector((state) => state.categories);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCategory());
	}, [dispatch]);
	return (
		<>
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
		</>
	);
};

Home.propTypes = {};

export default Home;

import axios from "axios";
require("dotenv").config({ debug: process.env.DEBUG });

export const axiosClient = axios.create({
	baseURL: "http://localhost:4000/api",
	// timeout: 1000,
	headers: { "Content-Type": "application/json" },
});

import React from "react";

const Api_Request = async (url = "", optionsObj = null, errMsg = "") => {
	try {
		const response = await fetch(url, optionsObj);
		if (!response.ok) throw Error("Please reload the page ");
		return await response.json();
	} catch (err) {
		errMsg = err.message;
	} finally {
		return errMsg;
	}
};

export default Api_Request;

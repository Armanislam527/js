import React from "react";
// Removed useContext as it was not being used in this component.
// import { useContext } from "react";
// Removed DataContext import as it was not being used in this component.
// import { DataContext } from "../ context/DataContext";
import Header from "../components/Header";

function Heading({ title }) {
	return (
		<div>
			<Header title={title} />
		</div>
	);
}
Heading.defaultProps = {
	title: "Hi From Heading Component Default Props",
};
export default Heading;

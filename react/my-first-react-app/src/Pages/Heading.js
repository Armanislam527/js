import React from "react";
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

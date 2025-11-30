import React from "react";

const Footer = ({ length }) => {
	const today = new Date();
	return (
		<footer>
			<p>Copyright &copy; {today.getFullYear()}</p>
			<code>this is about a list with {length} items</code>
		</footer>
	);
};

export default Footer;

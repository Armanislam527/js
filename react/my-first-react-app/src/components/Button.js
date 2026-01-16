import React from "react";
const Button = ({ buttontext, onClick, reqType }) => {
	return (
		<button
			className={buttontext === reqType ? "active" : null}
			onClick={onClick}>
			{buttontext}
		</button>
	);
};

export default Button;

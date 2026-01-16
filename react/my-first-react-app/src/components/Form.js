import React from "react";
import Button from "./Button";
const Form = ({ reqType, setReqType }) => {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<Button
				buttontext="users"
				onClick={() => setReqType("users")}
				reqType={reqType}
			/>
			<Button
				buttontext="posts"
				onClick={() => setReqType("posts")}
				reqType={reqType}
			/>
			<Button
				buttontext="comments"
				onClick={() => setReqType("comments")}
				reqType={reqType}
			/>
		</form>
	);
};

export default Form;

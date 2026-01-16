import React from "react";
import Showlist from "./showlist";
const List = ({ item }) => {
	return (
		<div>
			<ol>
				{item.map((i) => (
					<Showlist i={i} />
				))}
			</ol>
		</div>
	);
};

export default List;

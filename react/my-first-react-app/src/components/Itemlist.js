import React from "react";
import Additem from "./Additem.js";
import Lineitem from "./lineitem.js";

const Itemlist = ({
	items,
	handleCheck,
	handleDelete,
	handleClearAll,
	key,
	newItem,
	setNewItem,
	handleAddSubmit,
}) => {
	return (
		<ul>
			{items.map((item) => (
				<Lineitem
					key={key}
					handleCheck={handleCheck}
					handleDelete={handleDelete}
					item={item}
				/>
			))}
			<li>
				<button
					onClick={handleClearAll}
					style={{
						textAlign: "center",
						alignContent: "center",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "16px",
						marginTop: "10px",
					}}>
					Clear All
				</button>
			</li>
			<li>
				<Additem
					newItem={newItem}
					setNewItem={setNewItem}
					handleAddSubmit={handleAddSubmit}
				/>
			</li>
		</ul>
	);
};

export default Itemlist;

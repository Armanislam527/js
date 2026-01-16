import React, { useState } from "react"; // 1. Import useEffect
import "./../style/content.css";
import Itemlist from "./Itemlist";
import SearchItem from "./searchitem";
// Removed: let counts = 0;

const Content = ({
	items,
	setItems,
	handleCheck,
	handleDelete,
	handleReset,
	newItem,
	setNewItem,
	handleAddSubmit,
	searchTerm,
	setSearchTerm,
}) => {
	const [name, setName] = useState("Arman");
	const [count, setCount] = useState(0);
	// Start with an empty array or a default value while loading from storage

	// --- useEffect to Load Data from localStorage on Mount ---
	const handleClearAll = () => {
		setItems([]);
		localStorage.removeItem("Shoppinglist");
	};
	const handleNameChange = () => {
		const names = ["Alice", "Bob", "Charlie"];
		const int = Math.floor(Math.random() * 3);
		setName(names[int]);
	};

	// FIXED: Use useState for reliable counting
	const handleClick = () => {
		setCount((prevCount) => prevCount + 1);
		console.log(`A click was registered for ${count} times.`);
	};

	const handleClick2 = (nameParam) => {
		console.log(`${nameParam} is clicked`);
	};

	const handleClick3 = (e) => {
		console.log(e.target.innerText);
	};

	return (
		<>
			<p onDoubleClick={handleClick}>Hello {name}</p>
			<button onClick={handleNameChange}>Change Name</button>
			<button onClick={handleClick}>Click it {count} times</button>
			<button onClick={() => handleClick2("arman")}>Click it </button>
			<button onClick={(e) => handleClick3(e)}>Click it </button>
			<SearchItem searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{items.length ? (
				<Itemlist
					items={items.filter((item) =>
						(item.name || "")
							?.toLowerCase()
							.includes(searchTerm.toLowerCase())
					)}
					setItems={setItems}
					handleCheck={handleCheck}
					handleDelete={handleDelete}
					handleClearAll={handleClearAll}
					newItem={newItem}
					setNewItem={setNewItem}
					handleAddSubmit={handleAddSubmit}
				/>
			) : (
				<p
					style={{
						marginTop: "2rem",
						color: "offwhite",
						background: "gray",
						padding: "1rem",
					}}>
					Your shopping list is empty.
					<button onClick={handleReset}>Reset to Default</button>
				</p>
			)}
		</>
	);
};

export default Content;

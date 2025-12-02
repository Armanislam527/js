import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./footer";
import CopyButtonExample from "./CopyButtonExample";
import handleGlobalCopy from "./handleGlobalCopy";
import ColorField from "./colorfield";
// Default shopping list (for restoration)
const defaultShoppingList = [
	{
		id: 1,
		checked: true,
		item: "One half pound bag of Cocoa Covered Almonds Unsalted",
	},
	{ id: 2, checked: false, item: "Item 2" },
	{ id: 3, checked: false, item: "Item 3" },
];

function App() {
	const API_URL = "http://localhost:3500/items";
	const [items, setItems] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [newItem, setNewItem] = useState("");
	const handleReset = () => {
		setItems(defaultShoppingList);
		localStorage.setItem(
			"Shoppinglist",
			JSON.stringify(defaultShoppingList)
		);
	};

	useEffect(() => {
		// Get the string data from localStorage
		{
			/*const storedList = localStorage.getItem("Shoppinglist");

		if (storedList) {
			// If data exists, parse it and set the state
			setItems(JSON.parse(storedList));
		} else {
			// If no data exists in localStorage, set the default list
			setItems(defaultShoppingList);
			localStorage.setItem(
				"Shoppinglist",
				JSON.stringify(defaultShoppingList)
			); // Save default to localStorage
		}*/
		}
		const fetchItems = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) throw Error("Did not receive expected data");
				const listItems = await response.json();
				setItems(listItems);
			} catch (err) {
				console.error(err.message);
			}
		};
		fetchItems();
	}, []);

	const handleCheck = (id) => {
		console.log(`key:${id}`);
		const listItems = items.map((item) =>
			item.id === id ? { ...item, checked: !item.checked } : item
		);
		setItems(listItems);
		localStorage.setItem("Shoppinglist", JSON.stringify(listItems));
	};

	const handleDelete = (id) => {
		console.log(`Item is deleted by id ${id}`);
		const listItems = items.filter((item) => item.id !== id);
		setItems(listItems);
		localStorage.setItem("Shoppinglist", JSON.stringify(listItems));

		if (listItems.length === 0) {
			localStorage.removeItem("Shoppinglist");
		}
	};
	const handleAddSubmit = (e) => {
		e.preventDefault(); // Prevent page reload
		if (!newItem) return; // Don't add empty items

		const id = items.length ? items[items.length - 1].id + 1 : 1;
		const myNewItem = { id, checked: false, item: newItem };

		const updatedItems = [...items, myNewItem];
		// Use setAndSaveItems (helper function from previous solutions) or define logic here
		setItems(updatedItems);
		localStorage.setItem("Shoppinglist", JSON.stringify(updatedItems));

		setNewItem(""); // Clear the input field after submission
	};
	return (
		<div className="App" onCopy={handleGlobalCopy}>
			<Header title="My first React application in which I'm learning from scratch" />
			<Content
				items={items}
				setItems={setItems}
				handleCheck={handleCheck}
				handleDelete={handleDelete}
				handleReset={handleReset}
				newItem={newItem}
				setNewItem={setNewItem}
				handleAddSubmit={handleAddSubmit}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<ColorField />
			<Footer length={items.length} />
			<CopyButtonExample />
		</div>
	);
}

export default App;

import { useState, useEffect } from "react";
import React from "react";
import "./style/App.css";
import Content from "./components/Content";
import Form from "./components/Form";
import Footer from "./components/footer";
import List from "./components/List";
import CopyButtonExample from "./components/CopyButtonExample";
import handleGlobalCopy from "./components/handleGlobalCopy";
import ColorField from "./components/colorfield";
import Api_Request from "./components/Api_Request";
// Default shopping list (for restoration)
const defaultShoppingList = [
	{
		id: 1,
		checked: true,
		name: "One half pound bag of Cocoa Covered Almonds Unsalted",
	},
	{ id: 2, checked: false, name: "Item 2" },
	{ id: 3, checked: false, name: "Item 3" },
];

function App() {
	const API_URL = "http://localhost:3500/items";
	const [items, setItems] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [newItem, setNewItem] = useState("");
	const [fetchError, setFetchError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const API_URL1 = "https://jsonplaceholder.typicode.com";
	const [reqType, setReqType] = useState("users");
	const [item, setItem] = useState([]);
	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await fetch(`${API_URL1}/${reqType}`);
				if (!response.ok) throw Error("Did not receive expected data");
				const listItem = await response.json();
				setItem(listItem);
			} catch (err) {
				console.log(err);
			}
		};
		fetchItem();
	}, [reqType]);
	useEffect(() => {
		{
			/*// Get the string data from localStorage
		const storedList = localStorage.getItem("Shoppinglist");

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
				if (isLoading) {
					// Simulate a delay for loading effect
					await new Promise((resolve) => setTimeout(resolve, 1000));
				}
				const response = await fetch(API_URL);
				if (!response.ok) throw Error("Did not receive expected data");
				const listItems = await response.json();
				// console.log(listItems);
				setItems(listItems);
				setFetchError(null);
			} catch (err) {
				setFetchError(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		setTimeout(() => {
			(async () => await fetchItems())();
		}, 1000);
	}, []);
	const handleReset = () => {
		setItems(defaultShoppingList);
		localStorage.setItem(
			"Shoppinglist",
			JSON.stringify(defaultShoppingList)
		);
	};
	const handleCheck = async (id) => {
		console.log(`key:${id}`);
		const listItems = items.map((item) =>
			item.id === id ? { ...item, checked: !item.checked } : item
		);
		setItems(listItems);
		const myitem = listItems.find((item) => String(item.id) === String(id));
		const updateOptions = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ checked: myitem.checked }),
		};
		const reqUrl = await Api_Request(`${API_URL}/${id}`, updateOptions);
		if (reqUrl) {
			setFetchError(reqUrl);
		} else {
			setFetchError(null);
		}
		localStorage.setItem("Shoppinglist", JSON.stringify(listItems));
	};

	const handleDelete = async (id) => {
		console.log(`Item is deleted by id ${id}`);
		const listItems = items.filter((item) => item.id !== id);
		setItems(listItems);
		const deleteOptions = {
			method: "DELETE",
		};
		const reqUrl = await Api_Request(`${API_URL}/${id}`, deleteOptions);
		if (reqUrl) {
			setFetchError(reqUrl);
		} else {
			setFetchError(null);
		}
		localStorage.setItem("Shoppinglist", JSON.stringify(listItems));
		if (listItems.length === 0) {
			localStorage.removeItem("Shoppinglist");
		}
	};
	const handleAddSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload
		if (!newItem) return; // Don't add empty items

		const id = items.length
			? String(parseInt(items[items.length - 1].id) + 1)
			: "1";
		const myNewItem = { id, checked: false, name: newItem };

		const updatedItems = [...items, myNewItem];
		// Use setAndSaveItems (helper function from previous solutions) or define logic here
		setItems(updatedItems);
		const postOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(myNewItem),
		};
		const result = await Api_Request(API_URL, postOptions);
		if (result) setFetchError(result.message);
		localStorage.setItem("Shoppinglist", JSON.stringify(updatedItems));

		setNewItem(""); // Clear the input field after submission
	};
	return (
		<div className="App" onCopy={handleGlobalCopy}>

			<main>
				{isLoading && <p>Loading items...</p>}
				{fetchError && (
					<p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
				)}
				{!fetchError && !isLoading && (
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
				)}
			</main>
			<ColorField />
			<Form reqType={reqType} setReqType={setReqType} />
			<List item={item} />
			<Footer length={items.length} />
			<CopyButtonExample />
		</div>
	);
}

export default App;

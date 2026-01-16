import { FaPlus } from "react-icons/fa";
import { useRef } from "react";
// Accept props: newItem value, setter function, and submit handler
const Additem = ({ newItem, setNewItem, handleAddSubmit }) => {
	const inputRef = useRef(null);
	return (
		// Use the onSubmit handler for the form itself
		<form className="addForm" onSubmit={handleAddSubmit}>
			<label htmlFor="addItem"> Add Item</label>
			<input
				autoFocus // Use camelCase autofocus in React
				ref={inputRef}
				id="additem"
				type="text"
				placeholder="Add Item"
				// Value is controlled by the parent component's state
				value={newItem}
				// Update the par/*  */ent component's state on change
				onChange={(e) => setNewItem(e.target.value)}
				required
			/>
			{}

			<button
				type="submit"
				aria-label="Add Item"
				onClick={() => inputRef.current.focus()}>
				<FaPlus />
			</button>
		</form>
	);
};

export default Additem;
// End of src/Additem.js

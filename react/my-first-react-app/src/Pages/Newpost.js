import React from "react";
// Removed DataContext imports as we are now using easy-peasy for state management.
// import { DataContext } from "../ context/DataContext";
// import { useContext } from "react";
// Import easy-peasy hooks to access state and actions from the global store.
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect after post creation
import { format } from "date-fns"; // Import format for date utility

function Newpost() {
	// Use useStoreState to get state variables from the easy-peasy store.
	const title = useStoreState((state) => state.title);
	const body = useStoreState((state) => state.body);
	const author = useStoreState((state) => state.author);
	const posts = useStoreState((state) => state.posts); // Need posts to generate new ID

	// Use useStoreActions to get actions (setters and thunks) from the easy-peasy store.
	const { setTitle, setBody, setAuthor, createNewPost } = useStoreActions(
		(actions) => actions,
	);

	const navigate = useNavigate(); // Hook for navigation

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior (page reload)

		// Generate a new ID for the post
		const id = posts.length ? String(parseInt(posts[posts.length - 1].id) + 1) : "1";
		const datetime = format(new Date(), "MMMM dd, yyyy pp"); // Get current date and time

		// Create the new post object
		const newPost = { id, title, datetime, body, author };

		// Dispatch the createNewPost thunk to add the new post via API and update store
		createNewPost(newPost);

		// Clear form fields after submission
		setTitle("");
		setBody("");
		setAuthor("");

		// Navigate back to the home page or post list
		navigate("/");
	};

	return (
		<>
			<h2>Create New Post</h2>
			{/* The form now uses our local handleSubmit function */}
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					value={title}
					// onChange dispatches the easy-peasy action to update the 'title' state
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<br />
				<label htmlFor="body">Content:</label>
				<textarea
					id="body"
					value={body}
					// onChange dispatches the easy-peasy action to update the 'body' state
					onChange={(e) => setBody(e.target.value)}
					required></textarea>
				<br />
				<label htmlFor="author">Author:</label>
				<input
					type="text"
					id="author"
					value={author}
					// onChange dispatches the easy-peasy action to update the 'author' state
					onChange={(e) => setAuthor(e.target.value)}
					required
				/>
				<br />
				<button type="submit">Add Post</button>
			</form>
		</>
	);
}

export default Newpost;

import React, { useEffect, useState } from "react"; // Import useState
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { api } from "./../api/axios_post";
// Removed DataContext imports as we are now using easy-peasy for state management.
// import { DataContext } from "../ context/DataContext";
// import { useContext } from "react";
// Import easy-peasy hooks to access state and actions from the global store.
import { useStoreState, useStoreActions } from "easy-peasy";

const EditPost = () => {
	// Use useStoreState to get state variables from the easy-peasy store for editing.
	const editTitle = useStoreState((state) => state.editTitle);
	const editBody = useStoreState((state) => state.editBody);
	const author = useStoreState((state) => state.author); // Assuming 'author' for editing is also in store

	// Use useStoreActions to get actions (setters and thunks) from the easy-peasy store.
	const { setEditTitle, setEditBody, setAuthor, editPost } = useStoreActions(
		(actions) => actions,
	);

	const { id } = useParams();
	const navigate = useNavigate(); // Hook for navigation

	// Local state for fetching the post to edit
	const [fetchError, setFetchError] = useState("");
	const [isLoading, setIsLoading] = useState(true); // Optional loading state
	const [fetchedPost, setFetchedPost] = useState(null); // State to hold the fetched post

	useEffect(() => {
		const fetchPost = async () => {
			try {
				setIsLoading(true); // Set loading to true
				setFetchError(""); // Reset error
				const response = await api.get(`/posts/${id}`);
				console.log("Fetched Post Data:", response.data); // Log the data
				setFetchedPost(response.data); // Store the fetched post in local state
			} catch (err) {
				console.error("Error fetching post:", err); // Log the error object
				let errorMsg = "Failed to fetch post.";
				if (err.response) {
					// Server responded with an error status
					errorMsg = `Server Error: ${err.response.status} - ${err.response.statusText}`;
					console.log(err.response.data);
					console.log(err.response.status);
					console.log(err.response.headers);
				} else if (err.request) {
					// Request was made but no response received
					errorMsg = "Network Error: No response received.";
					console.log(err.request);
				} else {
					// Something else happened
					errorMsg = `Error: ${err.message}`;
				}
				setFetchError(errorMsg);
				setFetchedPost(null); // Ensure state is cleared on error
			} finally {
				setIsLoading(false); // Set loading to false regardless of success/error
			}
		};

		if (id) {
			// Only fetch if id exists
			fetchPost();
		} else {
			// Handle case where id might be undefined initially
			setFetchError("Post ID not found.");
			setIsLoading(false);
		}
	}, [id]); // Dependency array includes 'id'

	// Effect to populate the form fields once the post is fetched
	useEffect(() => {
		if (fetchedPost) {
			// Assuming your API returns an object with 'title', 'content', and 'author' properties
			setEditTitle(fetchedPost.title || "");
			setEditBody(fetchedPost.content || "");
			// If author is editable, update it too
			setAuthor(fetchedPost.author || ""); // Use fetched author
		} else {
			// If no post was fetched (due to error or initial state), clear the fields
			setEditTitle("");
			setEditBody("");
			setAuthor(""); // Clear author as well
		}
	}, [fetchedPost, setEditTitle, setEditBody, setAuthor]); // Added setAuthor to dependencies

	// Function to handle saving the edited post
	const handleSave = () => {
		// Construct the data object to send to the API
		const updatedPostData = {
			id: id,
			title: editTitle,
			body: editBody,
			author: author,
		};
		// Dispatch the easy-peasy thunk to update the post
		editPost({ id, data: updatedPostData });
		navigate(`/post/${id}`); // Navigate back to the post details page
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (fetchError) {
		return (
			<main>
				<h2>Error</h2>
				<p>{fetchError}</p>
				<Link to="/">Return Home</Link>
			</main>
		);
	}

	// Use the locally fetched post for the conditional rendering
	const postExists = !!fetchedPost;

	return (
		<main>
			{postExists ? (
				<>
					<h2>Edit Post</h2>
					{/* The form now has a local onSubmit handler which uses the easy-peasy action */}
					<form onSubmit={(e) => e.preventDefault()}>
						<label htmlFor="editTitle">Title:</label>
						<input
							id="editTitle"
							type="text"
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
						/>
						<label htmlFor="editBody">Content:</label>
						<textarea
							id="editBody"
							value={editBody}
							onChange={(e) => setEditBody(e.target.value)}
						/>
						<label htmlFor="editAuthor">Author:</label>
						<input
							id="editAuthor"
							type="text"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
						/>
						<button type="button" onClick={handleSave}>
							Save Changes
						</button>
					</form>
				</>
			) : (
				<>
					{/* This block might not be reached if fetchError is handled above */}
					<h2>Post Not Found</h2>
					<Link to="/">Return Home</Link>
				</>
			)}
		</main>
	);
};

export default EditPost;

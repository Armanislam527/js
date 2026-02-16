import React, { useEffect, useState } from "react"; // Import useState
import { useParams, Link } from "react-router-dom";
import { api } from "./../api/axios_post";
import { DataContext } from "../ context/DataContext";
import { useContext } from "react";
const EditPost = () => {
	const {
		editTitle,
		setEditTitle,
		editBody,
		setEditBody,
		author,
		setAuthor,
		handleEdit,
	} = useContext(DataContext);
	const { id } = useParams();
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
			setAuthor(fetchedPost.author || "Unknown Author");
		} else {
			// If no post was fetched (due to error or initial state), clear the fields
			setEditTitle("");
			setEditBody("");
			// setAuthor(''); // Or reset to default
		}
	}, [fetchedPost, setEditTitle, setEditBody /*, setAuthor */]); // Dependencies include fetchedPost

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
					{/* Pass the handleEdit function which uses the local state */}
					<form onSubmit={(e) => e.preventDefault()}>
						<label htmlFor="editTitle">Title:</label>
						<input
							id="editTitle"
							type="text"
							value={editTitle} // Use state managed by parent/App
							onChange={(e) => setEditTitle(e.target.value)} // Update state managed by parent/App
						/>
						<label htmlFor="editBody">Content:</label>
						<textarea
							id="editBody"
							value={editBody} // Use state managed by parent/App
							onChange={(e) => setEditBody(e.target.value)} // Update state managed by parent/App
						/>
						<label htmlFor="editAuthor">Author:</label>
						<input
							id="editAuthor"
							type="text"
							value={author} // Use state managed by parent/App
							onChange={(e) => setAuthor(e.target.value)} // Update state managed by parent/App
						/>
						<button
							type="button"
							onClick={() => handleEdit(fetchedPost.id)}>
							{" "}
							{/* Use fetchedPost.id */}
							Save Changes
						</button>
					</form>
				</>
			) : (
				<>
					{" "}
					{/* This block might not be reached if fetchError is handled above, but kept for completeness */}
					<h2>Post Not Found</h2>
					<Link to="/">Return Home</Link>
				</>
			)}
		</main>
	);
};

export default EditPost;

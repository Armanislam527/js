import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
// Removed DataContext imports as we are now using easy-peasy for state management.
// import { DataContext } from "../ context/DataContext";
// import { useContext } from "react";
// Import easy-peasy hooks to access state and actions from the global store.
import { useStoreState, useStoreActions } from "easy-peasy";

function Postdetails() {
	// Use useStoreState to get the 'posts' array from the easy-peasy store.
	const posts = useStoreState((state) => state.posts);
	// Use useStoreActions to get the 'deleteExistingPost' action from the easy-peasy store.
	const deleteExistingPost = useStoreActions(
		(actions) => actions.deleteExistingPost,
	);

	const { id } = useParams();
	const navigate = useNavigate(); // Hook for navigation

	const post = posts.find((post) => post.id.toString() === id);

	// Function to handle deleting a post
	const handleDeleteClick = (postId) => {
		deleteExistingPost(postId); // Dispatch the easy-peasy thunk to delete the post.
		navigate("/post"); // Navigate back to the post list after deletion.
	};

	return (
		<>
			{post ? (
				<div>
					<h2>{post.title}</h2>
					<p>{post.content}</p>
					author: <b>{post.author}</b> <br />
					<small>{post.datetime}</small>
					{/* The delete button now dispatches the easy-peasy action */}
					<button onClick={() => handleDeleteClick(post.id)}>
						Delete {/* Removed Link from button as navigation is handled in handleDeleteClick */}
					</button>
					<Link
						to={`/post/edit/${post.id}`}
						style={{ textDecoration: "none" }}>
						Edit Post
					</Link>
					<br />
					<Link to="/post" style={{ textDecoration: "none" }}>
						Go Back
					</Link>
				</div>
			) : (
				<>
					<h2>Post Not Found</h2>
					<p>Well, that's disappointing.</p>
					<p>
						<Link to="/">Go to Homepage</Link>
					</p>
				</>
			)}
		</>
	);
}

export default Postdetails;

import React from "react";
import { Link } from "react-router-dom";
// Removed DataContext imports as we are now using easy-peasy for state management.
// import { DataContext, useContext } from "../ context/DataContext";
// Import easy-peasy hooks to access state and actions from the global store.
import { useStoreState, useStoreActions } from "easy-peasy";

function Postpage() {
	// Use useStoreState to get state variables from the easy-peasy store.
	// These will automatically re-render the component when they change.
	const posts = useStoreState((state) => state.posts);
	const postsLoading = useStoreState((state) => state.postsLoading);
	const postsFetchError = useStoreState((state) => state.postsFetchError);

	// Use useStoreActions to get actions from the easy-peasy store.
	// These are functions to dispatch changes to the store.
	const { setId, editPost } = useStoreActions((actions) => actions);

	return (
		<div className="postpage">
			<div>
				{/* Display loading state for posts */}
				{postsLoading && <p>Loading posts...</p>}
				{/* Display fetch error for posts */}
				{postsFetchError && (
					<p style={{ color: "red" }}>{postsFetchError}</p>
				)}
				{/* Display message if no posts and not loading/errored */}
				{!postsLoading && !postsFetchError && posts.length === 0 && (
					<p>No posts to display.</p>
				)}
			</div>
			{posts.length ? (
				<>
					{posts.map((post) => (
						<li key={post.id}> {/* Added key for list items */}
							{/* Calling setId here might be problematic if it's meant to set a global single ID.
							   Consider if 'setId' should be called here or when a specific post is selected/viewed.
							   For now, keeping it as is but be aware of potential side effects. */}
							{setId(post.id ? post.id : null)}
							<div>
								<h2>{post.title}</h2>
								<p>
									{post.content.length <= 25
										? post.content
										: post.content.substring(0, 25) + "..."}
								</p>
								<small>{post.datetime}</small>
								<div></div>
								<small>Author:{post.author}</small>
							</div>
							<div className="linkdiv">
								<Link
									to={`/post/${post.id}`}
									style={{ textDecoration: "none" }}>
									see more
								</Link>

								{/* The 'editPost' action from easy-peasy is available.
								   If this button directly triggers an edit, consider passing post.id and data.
								   For now, the Link handles navigation to the edit page. */}
								<Link
									to={`/post/edit/${post.id}`}
									style={{ textDecoration: "none" }}>
									edit
								</Link>
							</div>
						</li>
					))}
				</>
			) : (
				// Only show this if not loading and no error, and no posts
				!postsLoading && !postsFetchError && <h2>No posts to display</h2>
			)}
		</div>
	);
}

export default Postpage;

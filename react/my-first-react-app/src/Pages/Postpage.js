import React from "react";
import { Link } from "react-router-dom";
import { DataContext, useContext } from "../ context/DataContext";
function Postpage() {
	const { posts, setId, handleEdit, isLoading, fetchError } =
		useContext(DataContext);
	return (
		<div className="postpage">
			<div>
				{isLoading && <p>Loading posts...</p>}
				{fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
				{!isLoading && !fetchError && posts.length === 0 && (
					<p>No posts to display.</p>
				)}
			</div>
			{posts.length ? (
				<>
					{posts.map((post) => (
						<li>
							{setId(post.id ? post.id : null)}
							<div key={post.id}>
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
				<h2>No posts to display</h2>
			)}
		</div>
	);
}

export default Postpage;

import React from "react";
import { useParams, Link } from "react-router-dom";
import { DataContext } from "../ context/DataContext";
import { useContext } from "react";
function Postdetails() {
	const { posts, handleDelete, handleEdit } = useContext(DataContext);
	const { id } = useParams();

	const post = posts.find((post) => post.id.toString() === id);
	return (
		<>
			{post ? (
				<div>
					<h2>{post.title}</h2>
					<p>{post.content}</p>
					author: <b>{post.author}</b> <br />
					<small>{post.datetime}</small>
					<button onClick={() => handleDelete(post.id)}>
						<Link to="/post" style={{ textDecoration: "none" }}>
							Delete
						</Link>
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

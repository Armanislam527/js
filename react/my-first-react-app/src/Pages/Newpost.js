import React from "react";
import { useParams, Link } from "react-router-dom";

function Newpost({
	title,
	setTitle,
	body,
	setBody,
	author,
	setAuthor,
	handleAddSubmit,
}) {
	return (
		<>
			<h2>Create New Post</h2>
			<form onSubmit={handleAddSubmit}>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<br />
				<label htmlFor="body">Content:</label>
				<textarea
					id="body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
					required></textarea>
				<br />
				<label htmlFor="author">Author:</label>
				<input
					type="text"
					id="author"
					value={author}
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

import React from "react";
import { Link } from "react-router-dom";
function Postpage({ posts, setId }) {
	return (
		<>
			{posts.length ? (
				<>
					{posts.map((post) => (
						<>
							<div key={post.id}>
								<h2>{post.title}</h2>
								<p>
									{post.content.length <= 25
										? post.content
										: post.content.substring(0, 25) + "..."}
									{setId(post.id ? post.id : null)}
								</p>
								<small>{post.datetime}</small>
							</div>
							<Link
								to={`/post/${post.id}`}
								style={{ textDecoration: "none" }}>
								see more
							</Link>
						</>
					))}
				</>
			) : (
				<h2>No posts to display</h2>
			)}
		</>
	);
}

export default Postpage;

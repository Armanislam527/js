import Showlist from "../components/showlist";
import React, { useEffect, useState } from "react";
function Blog() {
	const [item, setItem] = useState([]);

	const API_URL1 = "https://jsonplaceholder.typicode.com";
	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await fetch(`${API_URL1}/posts`);
				if (!response.ok) throw Error("Did not receive expected data");
				const listItem = await response.json();
				setItem(listItem);
			} catch (err) {
				console.log(err);
			}
		};
		fetchItem();
	}, []);
	return (
		<div style={{ padding: "20px" }}>
			<h1>Blog</h1>
			<p>Welcome to the Blog page.</p>{" "}
			<ul style={{ listStyle: "none", padding: 0 }}>
				{item.map((post) => (
					<Showlist i={post} />
				))}
			</ul>
		</div>
	);
}

export default Blog;

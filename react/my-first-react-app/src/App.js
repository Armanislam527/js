import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import Applicatiion from "./Pages/Application";
import Services from "./Pages/Services";
import Blog from "./Pages/blog";
import Footer from "./components/footer";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Missing from "./Pages/Missing";
import Postpage from "./Pages/Postpage";
import Postdetails from "./Pages/Postdetails";
import Newpost from "./Pages/Newpost";
import Heading from "./Pages/Heading";
import Login from "./Pages/Login";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
export const App = () => {
	const [posts, setPosts] = useState([]);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [author, setAuthor] = useState("Arman");
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [searching, setsearching] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [reqType, setReqType] = useState("posts");
	const [Id, setId] = useState([]);
	const API_URL = "http://localhost:3500";
	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await fetch(`${API_URL}/${reqType}`);
				if (!response.ok) throw Error("Did not receive expected data");
				const listItem = await response.json();
				setPosts(listItem);
			} catch (err) {
				console.log(err);
			}
		};
		fetchItem();
	}, [reqType]);
	useEffect(() => {
		const filteredResults = posts.filter(
			(post) =>
				post.title.toLowerCase().includes(searching.toLowerCase()) ||
				post.content.toLowerCase().includes(searching.toLowerCase()),
		);
		setSearchResults(filteredResults.reverse());
	}, [posts, searching]);
	const handleAddSubmit = async (e) => {
		e.preventDefault();
		const id = posts.length
			? String(parseInt(posts[posts.length - 1].id) + 1)
			: "1";
		const newPost = {
			id,
			title,
			datetime: new Date().toLocaleString(),
			content: body,
			author: author,
		};
		const addOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPost),
		};
		const response = await fetch(API_URL + "/posts", addOptions);
		const postsList = [...posts, newPost];
		setPosts(postsList);
		setTitle("");
		setBody("");
		navigate("/post");
	};
	const handleDelete = (id) => {
		const postsList = posts.filter((post) => post.id !== id);
		setPosts(postsList);
		const deleteOptions = {
			method: "DELETE",
		};
		fetch(`${API_URL}/posts/${id}`, deleteOptions)
			.then((response) => {
				if (!response.ok) throw Error("Failed to delete the post");
			})
			.catch((err) => console.log(err));
		navigate("/post");
	};
	return (
		<>
			{" "}
			<Navbar
				searchTerm={searching}
				setSearchTerm={setsearching}
				id={Id}
			/>{" "}
			<Routes>
				{" "}
				<Route
					path="/"
					element={
						<Applicatiion
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
					}
				/>{" "}
				<Route path="/about" element={<About />} />{" "}
				<Route path="/services" element={<Services />} />{" "}
				<Route path="/contact" element={<Contact />} />{" "}
				<Route path="/blog" element={<Blog />} />{" "}
				<Route path="*" element={<Missing />} />{" "}
				<Route
					path="/post"
					element={
						<>
							{" "}
							<Postpage
								posts={searchResults}
								setId={setId}
							/>{" "}
							<Blog />{" "}
						</>
					}
				/>{" "}
				<Route
					path="/post/:id"
					element={
						<Postdetails
							posts={posts}
							handleDelete={handleDelete}
						/>
					}
				/>{" "}
				<Route
					path="/post/new"
					element={
						<Newpost
							title={title}
							setTitle={setTitle}
							body={body}
							setBody={setBody}
							author={author}
							setAuthor={setAuthor}
							handleAddSubmit={handleAddSubmit}
						/>
					}
				/>{" "}
				<Route path="/login" element={<Login />} />{" "}
				<Route
					path="/heading"
					element={<Heading title="This is the heading title" />}
				/>{" "}
			</Routes>
			<Footer />
		</>
	);
};
// export default App;

import useWindowSize from "./../hooks/useWindowSize";
import useThemeDefault from "./../hooks/useThemeDefault";
import useAxiosFetch from "./../hooks/useAxiosFetch";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, getPosts, deletePost, api } from "./../api/axios_post";
const DataContext = createContext();

const DataProvider = ({ children }) => {
	/*const [data, setData] = useState([]);*/
	const [posts, setPosts] = useState([]);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [editTitle, setEditTitle] = useState("");
	const [editBody, setEditBody] = useState("");
	const [author, setAuthor] = useState("Arman");
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [searching, setSearching] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const [Id, setId] = useState([]);
	const { width } = useWindowSize();
	const theme = useThemeDefault();
	useAxiosFetch("http://localhost:3500/posts");
	const { data, fetchError, isLoading } = useAxiosFetch(
		"http://localhost:3500/posts",
	);
	// const API_URL = "http://localhost:3500";

	/*useEffect(() => {
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
		const fetchPosts = async () => {
			try {
				const postsData = await getPosts();
				setPosts(postsData.reverse());
			} catch (error) {
				console.error("Error fetching posts:", error);
				console.log(error.message);
				console.log(error.response);
				console.log(error.status);
				console.log(error.headers);
				console.log(error.config);
				console.log(error.request);
				console.log(error.code);
				console.log(error.name);
				console.log(error.stack);
				console.log(error.toJSON());
			}
		};
		fetchPosts();
	}, []);*/
	useEffect(() => setPosts(data));
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

		/*const addOptions = {
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
		navigate("/post");*/

		const addedPost = await api.post("/posts", newPost);
		setPosts([...posts, addedPost.data]);
		setTitle("");
		setBody("");
		navigate("/post");
	};
	const handleDelete = async (id) => {
		try {
			const postsList = posts.filter((post) => post.id !== id);
			setPosts(postsList);

			/*const deleteOptions = {
			method: "DELETE",
		};
		fetch(`${API_URL}/posts/${id}`, deleteOptions)
			.then((response) => {
				if (!response.ok) throw Error("Failed to delete the post");
			})
			.catch((err) => console.log(err));*/

			await api.delete(`/posts/${id}`);
			navigate("/post");
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};
	const handleEdit = async (id) => {
		const datetime = new Date();
		/*const PrevPost = posts.find((post) => String(post.id) === String(id));
		setEditTitle(PrevPost.title);
		setEditBody(PrevPost.content);*/
		const updatedPost = {
			id,
			title: editTitle,
			datetime,
			content: editBody,
			author: author,
		};
		try {
			const response = await api.put(`/posts/${id}`, updatedPost);
			setPosts(
				posts.map((post) =>
					post.id === id ? { ...response.data } : post,
				),
			);
			setEditTitle("");
			setEditBody("");
			navigate(`/post/${id}`);
			/*const postToEdit = posts.find(
				(post) => String(post.id) === String(id),
			);
			setEditTitle(postToEdit.title);
			setEditBody(postToEdit.content);
			navigate(`/post/${id}`);*/
		} catch (error) {
			console.error("Error editing post:", error);
		}
	};
	return (
		<DataContext.Provider
			value={{
				data,

				width,
				theme,
				posts,
				setPosts,
				title,
				setTitle,
				body,
				setBody,
				editTitle,
				setEditTitle,
				editBody,
				setEditBody,
				author,
				setAuthor,
				searchTerm,
				setSearchTerm,
				searching,
				setSearching,
				searchResults,
				setSearchResults,
				Id,
				setId,
				handleAddSubmit,
				handleDelete,
				handleEdit,
				fetchError,
				isLoading,
			}}>
			{children}
		</DataContext.Provider>
	);
};

export { DataContext, DataProvider, useContext };

import { createStore, action, thunk, computed } from "easy-peasy";
import api from "./../api/axios_post";
export default createStore({
	// actions
	posts: [],
	setPosts: action((state, payload) => {
		state.posts = payload;
	}),
	// thunks
	fetchPosts: thunk(async (actions) => {
		const response = await api.get("/posts");
		actions.setPosts(response.data);
	}),
	// computed value
	postCount: computed((state) => state.posts.length),

	posttitle: "",
	setPostTitle: action((state, payload) => {
		state.posttitle = payload;
	}),
	postbody: "",
	setPostBody: action((state, payload) => {
		state.postbody = payload;
	}),
	savePost: thunk(async (actions, newPost, helper) => {
		const response = await api.post("/posts", newPost);

		actions.setPosts([...actions.posts, response.data]);

		helper.resetForm();
	}),
	createNewPost: thunk(async (actions, payload) => {
		const response = await api.post("/posts", payload);
		actions.setPosts([...actions.posts, response.data]);
	}),
	deleteExistingPost: thunk(async (actions, payload) => {
		await api.delete(`/posts/${payload}`);
		actions.setPosts(actions.posts.filter((post) => post.id !== payload));
	}),
	updateExistingPost: thunk(async (actions, { id, data }) => {
		const response = await api.put(`/posts/${id}`, data);
		actions.setPosts(
			actions.posts.map((post) =>
				post.id === id ? response.data : post,
			),
		);
	}),
	editPost: thunk(async (actions, { id, data }) => {
		const response = await api.put(`/posts/${id}`, data);
		actions.setPosts(
			actions.posts.map((post) =>
				post.id === id ? response.data : post,
			),
		);
	}),
	resetForm: action((state) => {
		state.posttitle = "";
		state.postbody = "";
	}),
	search: "",
	setSearch: action((state, payload) => {
		state.search = payload;
	}),
	searchResult: [],
	setSearchResult: action((state, payload) => {
		state.searchResult = payload;
	}),
	searchPosts: thunk(async (actions, payload) => {
		const response = await api.get(`/posts?q=${payload}`);
		actions.setSearchResult(response.data);
	}),
	author: "",
	setAuthor: action((state, payload) => {
		state.author = payload;
	}),
	data: "",
	setData: action((state, payload) => {
		state.data = payload;
	}),
	API_URL: "http://localhost:3500",

	width: "",
	setWidth: action((state, payload) => {
		state.width = payload;
	}),
	theme: "",
	setTheme: action((state, payload) => {
		state.theme = payload;
	}),

	posts: "",
	setPosts: action((state, payload) => {
		state.posts = payload;
	}),

	title: "",

	setTitle: action((state, payload) => {
		state.title = payload;
	}),
	body: "",

	setBody: action((state, payload) => {
		state.body = payload;
	}),
	editTitle: "",

	setEditTitle: action((state, payload) => {
		state.editTitle = payload;
	}),
	editBody: "",
	setEditBody: action((state, payload) => {
		state.editBody = payload;
	}),
	author: "",
	setAuthor: action((state, payload) => {
		state.author = payload;
	}),
	searchTerm: "",

	setSearchTerm: action((state, payload) => {
		state.searchTerm = payload;
	}),
	searching: "",
	setSearching: action((state, payload) => {
		state.searching = payload;
	}),
	searchResults: "",
	setSearchResults: action((state, payload) => {
		state.searchResults = payload;
	}),
	Id: "",
	setId: action((state, payload) => {
		state.Id = payload;
	}),
	getPostById: computed((state) => (id) => {
		return state.posts.find((post) => post.id === id);
	}),
});

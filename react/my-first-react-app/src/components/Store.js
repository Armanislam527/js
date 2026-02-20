import { createStore, action, thunk, computed } from "easy-peasy";
import api from "./../api/axios_post";

// This is your Easy Peasy store. It holds all the global state for your application.
// Think of it as a central hub where all components can access and modify shared data.
export default createStore({
	// ===============================================
	// 1. STATE: These are the pieces of data your application needs to remember.
	// They are like variables that can be accessed by any component connected to the store.
	// ===============================================

	// State for blog posts
	posts: [], // An array to hold all fetched blog posts.
	postsLoading: true, // Indicates if posts are currently being loaded.
	postsFetchError: null, // Stores any error message that occurred during posts fetching.

	// State for individual post creation/editing forms
	posttitle: "", // The title input for a new or edited post.
	postbody: "", // The body content input for a new or edited post.

	// State for general post editing
	title: "", // Alternative title field, consider consolidating with posttitle.
	body: "", // Alternative body field, consider consolidating with postbody.
	editTitle: "", // Title specifically for the edit post form.
	editBody: "", // Body specifically for the edit post form.

	// State for search functionality
	search: "", // The current search query string.
	searchTerm: "", // Another search term, consider consolidating with 'search'.
	searching: "", // A flag or string related to the search process.
	searchResults: [], // An array to hold the results of a search operation.

	// State for author information (consider if this needs to be global or local)
	author: "", // The author of a post.

	// State for theme (e.g., 'dark' or 'light' mode)
	theme: "light", // Initial theme state. We'll manage this here instead of DataContext.

	// State for window width (often managed by a custom hook, but can be in store)
	width: typeof window !== "undefined" ? window.innerWidth : 0, // Initialize with actual window width or 0 if window is not defined.

	// Miscellaneous data fields (review if these are still needed or can be refactored)
	data: "", // A generic data field.
	Id: "", // A generic ID field.

	// API related constant
	API_URL: "http://localhost:3500", // The base URL for your API.

	// ===============================================
	// 2. ACTIONS: These are functions that directly modify the state.
	// They are synchronous and are the *only* way to change the state in Easy Peasy.
	// You dispatch an action to tell the store to update a specific piece of state.
	// 'state' is the current state of the model, 'payload' is the data passed to the action.
	// ===============================================

	// Actions for posts
	setPosts: action((state, payload) => {
		state.posts = payload; // Update the 'posts' array with new data.
	}),

	// Actions for posts loading and error status
	setPostsLoading: action((state, payload) => {
		state.postsLoading = payload; // Set the loading status for posts.
	}),
	setPostsFetchError: action((state, payload) => {
		state.postsFetchError = payload; // Set the error message for posts fetching.
	}),

	// Actions for post creation/editing form inputs
	setPostTitle: action((state, payload) => {
		state.posttitle = payload; // Set the post title input value.
	}),
	setPostBody: action((state, payload) => {
		state.postbody = payload; // Set the post body input value.
	}),
	setTitle: action((state, payload) => {
		state.title = payload; // Set the title field.
	}),
	setBody: action((state, payload) => {
		state.body = payload; // Set the body field.
	}),
	setEditTitle: action((state, payload) => {
		state.editTitle = payload; // Set the edit title field.
	}),
	setEditBody: action((state, payload) => {
		state.editBody = payload; // Set the edit body field.
	}),

	// Actions for search functionality
	setSearch: action((state, payload) => {
		state.search = payload; // Set the search query.
	}),
	setSearchTerm: action((state, payload) => {
		state.searchTerm = payload; // Set the search term.
	}),
	setSearching: action((state, payload) => {
		state.searching = payload; // Set the searching status.
	}),
	setSearchResults: action((state, payload) => {
		state.searchResults = payload; // Set the search results.
	}),

	// Actions for author
	setAuthor: action((state, payload) => {
		state.author = payload; // Set the author.
	}),

	// Actions for theme
	setTheme: action((state, payload) => {
		state.theme = payload; // Set the theme (e.g., 'dark' or 'light').
	}),

	// Actions for window width
	setWidth: action((state, payload) => {
		state.width = payload; // Set the window width.
	}),

	// Actions for miscellaneous data
	setData: action((state, payload) => {
		state.data = payload; // Set the generic data field.
	}),
	setId: action((state, payload) => {
		state.Id = payload; // Set the generic ID field.
	}),

	// Action to reset form fields
	resetForm: action((state) => {
		state.posttitle = ""; // Clear the post title.
		state.postbody = ""; // Clear the post body.
	}),

	// ===============================================
	// 3. THUNKS: These are functions that handle asynchronous operations (like API calls).
	// They don't directly modify the state. Instead, they dispatch actions *after*
	// an async operation completes to update the state.
	// 'actions' is an object containing all actions defined in the model.
	// 'payload' is any data passed when the thunk is called.
	// 'helper' provides access to other store utilities like 'getState', 'getStoreActions', etc.
	// ===============================================

	// Thunk to fetch all posts from the API
	fetchPosts: thunk(async (actions) => {
		actions.setPostsLoading(true); // Set loading to true before fetching.
		try {
			const response = await api.get("/posts");
			actions.setPosts(response.data); // Dispatch action to update posts state.
			actions.setPostsFetchError(null); // Clear any previous errors on success.
		} catch (err) {
			console.error("Error fetching posts:", err);
			// Set the error message if fetching fails.
			actions.setPostsFetchError(err.message || "Error fetching posts");
			actions.setPosts([]); // Clear posts on error to avoid displaying stale data.
		} finally {
			actions.setPostsLoading(false); // Set loading to false after fetching (whether success or error).
		}
	}),

	// Thunk to save a new post to the API
	savePost: thunk(async (actions, newPost, helper) => {
		try {
			const response = await api.post("/posts", newPost);
			// After successful API call, update the local state with the new post.
			actions.setPosts([...helper.getState().posts, response.data]);
			actions.resetForm(); // Reset form fields after saving.
		} catch (err) {
			console.error("Error saving post:", err);
		}
	}),

	// Thunk to create a new post (similar to savePost, consider consolidating)
	createNewPost: thunk(async (actions, payload, helper) => {
		try {
			const response = await api.post("/posts", payload);
			actions.setPosts([...helper.getState().posts, response.data]);
		} catch (err) {
			console.error("Error creating new post:", err);
		}
	}),

	// Thunk to delete an existing post
	deleteExistingPost: thunk(async (actions, payload, helper) => {
		try {
			await api.delete(`/posts/${payload}`);
			// Filter out the deleted post from the local state.
			actions.setPosts(
				helper.getState().posts.filter((post) => post.id !== payload),
			);
		} catch (err) {
			console.error("Error deleting post:", err);
		}
	}),

	// Thunk to update an existing post
	updateExistingPost: thunk(async (actions, { id, data }, helper) => {
		try {
			const response = await api.put(`/posts/${id}`, data);
			// Update the specific post in the local state.
			actions.setPosts(
				helper
					.getState()
					.posts.map((post) => (post.id === id ? response.data : post)),
			);
		} catch (err) {
			console.error("Error updating post:", err);
		}
	}),

	// Thunk to edit a post (similar to updateExistingPost, consider consolidating)
	editPost: thunk(async (actions, { id, data }, helper) => {
		try {
			const response = await api.put(`/posts/${id}`, data);
			actions.setPosts(
				helper
					.getState()
					.posts.map((post) => (post.id === id ? response.data : post)),
			);
		} catch (err) {
			console.error("Error editing post:", err);
		}
	}),

	// Thunk to search posts (this seems to update searchResult, not posts directly)
	searchPosts: thunk(async (actions, payload) => {
		try {
			// This performs a search query on the API and updates 'searchResult' state.
			const response = await api.get(`/posts?q=${payload}`);
			actions.setSearchResult(response.data);
		} catch (err) {
			console.error("Error searching posts:", err);
		}
	}),

	// Thunk to initialize window size tracking
	initializeWindowSize: thunk((actions) => {
		// Define the handleResize function to update the width in the store.
		const handleResize = () => {
			actions.setWidth(window.innerWidth);
		};

		// Add event listener when the thunk is initialized.
		window.addEventListener("resize", handleResize);

		// Immediately call handleResize to set the initial width.
		handleResize();

		// No explicit cleanup return for a thunk in this context,
		// but in a real app, you might want to consider how to
		// remove this listener if the store is ever "destroyed".
		// For a top-level store, it usually persists for the app's lifetime.
	}),

	// ===============================================
	// 4. COMPUTED PROPERTIES: These are derived pieces of state.
	// They are like getters that re-calculate their value whenever their
	// dependent state changes. They do not directly modify state.
	// ===============================================

	// Computed property to count the number of posts
	postCount: computed((state) => state.posts.length),

	// Computed property to get a single post by its ID
	getPostById: computed((state) => (id) => {
		return state.posts.find((post) => post.id === id);
	}),
});

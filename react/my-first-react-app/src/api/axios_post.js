import axios from "axios";

const API_URL = "http://localhost:3500/";

export const createPost = async (postData) => {
	try {
		const response = await axios.post(API_URL + "posts", postData);
		return response.data;
	} catch (error) {
		console.error("Error creating post:", error);
		throw error;
	}
};

export const getPosts = async () => {
	try {
		const response = await axios.get(API_URL + "posts");
		return response.data;
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};
export const deletePost = async (postId) => {
	try {
		const response = await axios.delete(`${API_URL}/posts/${postId}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting post:", error);
		throw error;
	}
};
export const updatePost = async (postId, updatedData) => {
	try {
		const response = await axios.put(`${API_URL}/${postId}`, updatedData);
		return response.data;
	} catch (error) {
		console.error("Error updating post:", error);
		throw error;
	}
};
export const api = axios.create({
	baseURL: API_URL,
});

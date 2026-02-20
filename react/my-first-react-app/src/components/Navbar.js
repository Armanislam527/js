import React from "react";
import { Link } from "react-router-dom";
// Removed DataContext import as we are now using easy-peasy for state management.
// import { DataContext } from "../ context/DataContext";
// Removed useContext as we will use easy-peasy's hooks instead.
// import { useContext } from "react";
// Import easy-peasy hooks to access state and actions from the global store.
import { useStoreState, useStoreActions } from "easy-peasy";

function Navbar() {
	// Use useStoreState to get the 'searchTerm' and 'Id' from the easy-peasy store.
	// This hook automatically re-renders the component when 'searchTerm' or 'Id' changes in the store.
	const searchTerm = useStoreState((state) => state.searchTerm);
	const Id = useStoreState((state) => state.Id);

	// Use useStoreActions to get the 'setSearchTerm' action from the easy-peasy store.
	// This action allows us to update the 'searchTerm' state in a controlled way.
	const setSearchTerm = useStoreActions((actions) => actions.setSearchTerm);

	return (
		<div className="navcontainer">
			<ul className="navbar">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/services">Services</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
				<li>
					<Link to="/blog">Blog</Link>
				</li>
				<li>
					<Link to="/post">Post</Link>
				</li>
				{/* Using the 'Id' from the easy-peasy store */}
				<li>
					<Link to={`/post/${Id}`}>Details</Link>
				</li>
				<li>
					<Link to="/post/new">New Post</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/heading">Header</Link>
				</li>
				<li>
					<Link to="/sdhgfas">Missing</Link>
				</li>
			</ul>
			<form className="searchForm" onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="search">Search Post</label>
				<input
					type="text"
					id="search"
					// Value is now from easy-peasy store
					value={searchTerm}
					// onChange dispatches the easy-peasy action to update the store
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</form>
		</div>
	);
}

export default Navbar;

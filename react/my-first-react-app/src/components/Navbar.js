import React from "react";
import { Link } from "react-router-dom";
function Navbar({ searchTerm, setSearchTerm, id }) {
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
				<li>
					<Link to={`/post/${id}`}>Details</Link>
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
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</form>
		</div>
	);
}

export default Navbar;

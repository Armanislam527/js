import React from "react";

function Navbar() {
	return (
		<div>
			<ul className="navbar">
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
				<li>
					<a href="/services">Services</a>
				</li>
				<li>
					<a href="/contact">Contact</a>
				</li>
				<li>
					<a href="/blog">Blog</a>
				</li>
				<li>
					<a href="/post">Post</a>
				</li>
				<li>
					<a href="/post/:id">New Post</a>
				</li>
				<li>
					<a href="/login">Login</a>
				</li>
				<li>
					<a href="/heading">Header</a>
				</li>
				<li>
					<a href="/sdhgfas">Missing</a>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;

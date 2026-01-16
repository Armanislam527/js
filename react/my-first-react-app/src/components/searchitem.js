import React from "react";

const SearchItem = ({ searchTerm, setSearchTerm }) => {
	return (
		<form className="searchForm" onSubmit={(e) => e.preventDefault()}>
			<label htmlFor="search"> Search</label>
			<input
				type="text"
				id="search"
				name="search"
				role="search"
				placeholder="Search Items"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</form>
	);
};

export default SearchItem;

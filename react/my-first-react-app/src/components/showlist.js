import React from "react";
const Showlist = ({ i }) => {
	// Helper function to render values, handling nested objects
	const renderValue = (val) => {
		if (typeof val === "object" && val !== null) {
			return (
				<div
					style={{
						marginLeft: "20px",
						fontSize: "0.9em",
						color: "#555",
					}}>
					{Object.entries(val).map(([subKey, subVal]) => (
						<div key={subKey}>
							<strong>{subKey}:</strong> {renderValue(subVal)}
						</div>
					))}
				</div>
			);
		}
		return String(val);
	};

	return (
		<li
			style={{
				border: "1px solid #ccc",
				margin: "10px 0",
				padding: "15px",
				borderRadius: "8px",
				listStyle: "none",
			}}>
			{Object.entries(i).map(([key, value]) => (
				<div key={key} style={{ marginBottom: "8px" }}>
					{key === "title" || key === "name" ? (
						<h2>{String(value)}</h2>
					) : (
						<div>
							<strong>{key}:</strong> {renderValue(value)}
						</div>
					)}
				</div>
			))}
		</li>
	);
};

export default Showlist;

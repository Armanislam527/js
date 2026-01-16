import React from "react";

const Showlist = ({ i }) => {
	return (
		<li>
			{Object.entries(i).map(([key, value]) => (
				<li key={key} style={{ marginBottom: "4px" }}>
					<strong>{key}:</strong>{" "}
					{typeof value === "object" && value !== null
						? Object.entries(value).map(
								(
									[id, val] // Removed { here
								) => (
									<div className="lili">
										<li
											key={id}
											style={{ marginLeft: "10px" }}>
											<strong>{id}:</strong> {String(val)}
										</li>
									</div>
								)
						  ) // Removed } here
						: String(value)}
				</li>
			))}
		</li>
	);
};

export default Showlist;

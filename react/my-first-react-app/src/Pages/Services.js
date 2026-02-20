import React from "react";
// Removed DataContext imports as we are now using easy-peasy for state management.
// import { DataContext, useContext } from "../ context/DataContext";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
// Import easy-peasy hook to access state from the global store.
import { useStoreState } from "easy-peasy";

function Services() {
	// Use useStoreState to get the 'width' from the easy-peasy store.
	// This will automatically re-render the component when the 'width' state changes.
	const width = useStoreState((state) => state.width);

	return (
		<>
			<div className="services">
				<h2>Our Services</h2>
				<div className="services-icons">
					{width > 768 ? (
						<FaLaptop style={{ color: "blue" }} />
					) : width > 480 ? (
						<FaTabletAlt style={{ color: "green" }} />
					) : (
						<FaMobileAlt style={{ color: "red" }} />
					)}
				</div>
			</div>
		</>
	);
}

export default Services;

import React from "react";
import { DataContext, useContext } from "../ context/DataContext";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";

function Services() {
	const width = useContext(DataContext);
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

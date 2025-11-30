import React from "react";
import colorName from "colornames";
import "./colorfield.css";
const ColorField = () => {
	const handleColor = (e) => {
		const colorNames = document.getElementById("colorname").value;
		const colorspace = document.getElementById("colorfield");
		let hexvval = colorName(colorNames);
		if (hexvval === undefined) {
			hexvval = "Unknown hex code";
		}
		let text = colorNames + " = " + hexvval;
		colorspace.style.backgroundColor = colorNames;
		colorspace.textContent = text;
	};
	return (
		<div id="colorfieldcontainer">
			<div id="colorfield">The color will be shown here</div>
			<form>
				<input
					autoFocus
					type="text"
					required
					placeholder="Type color name"
					id="colorname"
					onChange={() => handleColor()}
				/>
				<button>Toggle color</button>
			</form>
		</div>
	);
};

export default ColorField;

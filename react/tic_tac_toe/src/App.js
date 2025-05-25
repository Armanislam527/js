import { useState } from "react";
import "./App.css";

function Square() {
	const [value, setValue] = useState(null);
	function handleClick() {
		setValue("x");
	}
	return (
		<button className="square" onClick={handleClick}>
			{value}
		</button>
	);
}

export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	return (
		<>
			<script src="http://localhost:8097"></script>
			<div className="board-row">
				<Square value={squares} />
				<Square />
				<Square />
			</div>
			<div className="board-row">
				<Square />
				<Square />
				<Square />
			</div>
			<div className="board-row">
				<Square />
				<Square />
				<Square />
			</div>
			<div></div>
		</>
	);
}

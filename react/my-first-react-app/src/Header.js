import { useState } from "react";
import logo from "./logo.svg";

const headerStyle = {
	color: "lightgreen",
};
const user = {
	name: "Arman Islam",
	imageUrl: "https://cv-of-arman.netlify.app/arman_office.jpeg",
	imageSize: 90,
};

let content;
let isLoggedIn = true;

// Fix applied here: Added 'function' keyword and wrapped logic in '{ }'
function GetGreeting() {
	if (isLoggedIn) {
		content = <h1>Welcome back!</h1>;
	} else {
		content = <h1>Please sign up.</h1>;
	}
	return content;
}

const products = [
	{ title: "Cabbage", isFruit: false, id: 1 },
	{ title: "Garlic", isFruit: false, id: 2 },
	{ title: "Apple", isFruit: true, id: 3 },
];

function ShoppingList() {
	const listItems = products.map((product) => (
		<li
			key={product.id}
			style={{
				color: product.isFruit ? "magenta" : "darkgreen",
			}}>
			{product.title}
		</li>
	));

	return <ul>{listItems}</ul>;
}

function Profile() {
	return (
		<>
			<h1>{user.name}</h1>{" "}
			<img
				className="avatar"
				src={user.imageUrl}
				alt={"Photo of " + user.name}
				style={{
					width: user.imageSize,
					height: user.imageSize,
					borderRadius: user.imageSize / 2,
				}}
			/>
		</>
	);
}

function AboutPage() {
	return (
		<>
			<h1>About</h1>
			<p>
				Hello there.
				<br />
				How do you do?
			</p>
		</>
	);
}
function ConditionalRendering() {
	return isLoggedIn ? (
		<div>
			<h1>Statement is true.</h1>
		</div>
	) : (
		<div>
			<h1>Statement is false.</h1>
		</div>
	);
}

function SingleRendering() {
	return (
		<div>
			{isLoggedIn && (
				<h1
					title="this Statement is true. and this is only for true condition
          here there is not exist else condition or not if statement
          here just checked the true condition and then the execusion
          command is compiled">
					hover here for know the context
				</h1>
			)}
		</div>
	);
}

function MyApp() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<div>
			<h1>Counters that update separately</h1>
			<MyButton count={count} onClick={handleClick} />
			<MyButton count={count} onClick={handleClick} />
		</div>
	);
}

function MyButton({ count, onClick }) {
	return <button onClick={onClick}>Clicked {count} times</button>;
} // export default function MyApp() {
//   return (
//     <div>
//       <h1>Welcome to my app</h1>
//       <MyButton />
//     </div>
//   );
// }
const Header = (props) => {
	//or we can use props directly without destructuring
	// const { title } = props;
	//const Header({title}) => {
	return (
		<header className="App-header" style={headerStyle}>
			<title>{props.title}</title>
			<h1>{props.title}</h1>
			<br />
			<img src={logo} className="App-logo" alt="logo" />
			{/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a> */}
			<Profile />
			<GetGreeting />
			<ConditionalRendering />
			<SingleRendering />
			{/* <h1>Welcome to my app</h1> */}
			{/* <MyButton /> */}
			{/* <button>I'm a button</button> */}
			{/* <button className="btn">I'm a button</button> */}
			{/* <button className="btn btn-primary">I'm a button</button> */}
			{/* <button className="btn btn-secondary">I'm a button</button> */}
			{/* <button className="btn btn-success">I'm a button</button> */}
			{/* <button className="btn btn-danger">I'm a button</button> */}
			{/* <button className="btn btn-warning">I'm a button</button> */}
			{/* <button className="btn btn-info">I'm a button</button> */}
			{/* <button className="btn btn-light">I'm a button</button> */}
			{/* <button className="btn btn-dark">I'm a button</button> */}
			<MyApp />
			<AboutPage />
			<ShoppingList />
			<p>{user.name} </p>
			{/*<p>{true === true} </p>*/}
			<p>Hello {user.name} </p>
			<div>
				<h1>Groceries List</h1>
			</div>
		</header>
	);
};
Header.defaultProps = { title: "Default Title for Header Component" };
export default Header;

import logo from "./logo.svg";
import "./App.css";
const user = {
	name: "Arman Islam",
	imageUrl: "https://cv-of-arman.netlify.app/arman_office.jpeg",
	imageSize: 90,
};
let content;
let isLoggedIn = true;
function GetGreeting() {
	if (isLoggedIn) {
		content = <h1>Welcome back!</h1>;
	} else {
		content = <h1>Please sign up.</h1>;
	}
	return content;
}

function Profile() {
	return (
		<>
			<h1>{user.name}</h1>
			<img
				className="avatar"
				src={user.imageUrl}
				alt={"Photo of " + user.name}
				style={{
					width: user.imageSize,
					// height: user.imageSize,
					borderRadius: user.imageSize / 2,
				}}
			/>
		</>
	);
}
// import logo from './logo.svg';
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
function MyButton() {
	return <button>I'm a button</button>;
}

// export default function MyApp() {
//   return (
//     <div>
//       <h1>Welcome to my app</h1>
//       <MyButton />
//     </div>
//   );
// }
export default function App() {
	return (
		<div className="App">
			<header className="App-header">
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
				<MyButton />
				<AboutPage />
			</header>
		</div>
	);
}

// export default App;

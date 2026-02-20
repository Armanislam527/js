import Editpost from "./Pages/EditPost";
import "./style/index.css";
import Applicatiion from "./Pages/Application";
import Services from "./Pages/Services";
import Blog from "./Pages/blog";
import Footer from "./components/footer";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Missing from "./Pages/Missing";
import Postpage from "./Pages/Postpage";
import Postdetails from "./Pages/Postdetails";
import Newpost from "./Pages/Newpost";
import Heading from "./Pages/Heading";
import Login from "./Pages/Login";
import Navbar from "./components/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
// Removed: import { DataContext, DataProvider } from "./ context/DataContext";
// Removed: import { useContext } from "react";
// We now import `StoreProvider`, `useStoreState`, and `useStoreActions` from easy-peasy.
import { StoreProvider, useStoreState, useStoreActions } from "easy-peasy";
import Store from "./components/Store";

export const App = () => {
	// Instead of useContext(DataContext), we now use easy-peasy's useStoreState to access the 'theme' from our global store.
	// useStoreState hooks into the Easy Peasy store and automatically re-renders the component
	// when the 'theme' state changes.
	const theme = useStoreState((state) => state.theme);
	// We can also get actions from the store if we need to modify the theme from App.js,
	// though in this case, it's primarily consumed here.
	// const { setTheme } = useStoreActions((actions) => actions);

	return (
		// The `style` attribute now correctly applies the theme based on the 'theme' state from Easy Peasy.
		<div
			style={{
				backgroundColor: theme === "dark" ? "#333" : "#FFF",
				color: theme === "dark" ? "#FFF" : "#333",
			}}>
			{/* The DataProvider is no longer needed as theme management is now handled by easy-peasy.
			   The StoreProvider wraps the entire application, making the store available globally. */}
			<StoreProvider store={Store}>
				<Navbar />{" "}
				<Routes>
					{" "}
					<Route path="/" element={<Applicatiion />} />{" "}
					<Route path="/about" element={<About />} />{" "}
					<Route path="/services" element={<Services />} />{" "}
					<Route path="/contact" element={<Contact />} />{" "}
					<Route path="/blog" element={<Blog />} />{" "}
					<Route path="*" ele ment={<Missing />} />{" "}
					<Route
						path="/post"
						element={
							<>
								{" "}
								<Postpage /> <Blog />{" "}
							</>
						}
					/>{" "}
					<Route path="/post/:id" element={<Postdetails />} />{" "}
					<Route path="/post/new" element={<Newpost />} />{" "}
					<Route path="/post/edit/:id" element={<Editpost />} />{" "}
					<Route path="/login" element={<Login />} />{" "}
					<Route
						path="/heading"
						element={<Heading title="This is the heading title" />}
					/>{" "}
				</Routes>
				<Footer />
			</StoreProvider>
		</div>
	);
};
// export default App;

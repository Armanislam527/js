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
import { DataContext, DataProvider } from "./ context/DataContext";
import { useContext } from "react";
import { StoreProvider } from "easy-peasy";
import Store from "./components/Store";
export const App = () => {
	const theme = useContext(DataContext);
	return (
		<div
			style={{
				backgroundColor: theme === "dark" ? "#333" : "#FFF",
				color: theme === "dark" ? "#FFF" : "#333",
			}}>
			<DataProvider>
				<StoreProvider store={Store}>
					{" "}
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
						<Route
							path="/post/:id"
							element={<Postdetails />}
						/>{" "}
						<Route path="/post/new" element={<Newpost />} />{" "}
						<Route path="/post/edit/:id" element={<Editpost />} />{" "}
						<Route path="/login" element={<Login />} />{" "}
						<Route
							path="/heading"
							element={
								<Heading title="This is the heading title" />
							}
						/>{" "}
					</Routes>
					<Footer />
				</StoreProvider>
			</DataProvider>
		</div>
	);
};
// export default App;

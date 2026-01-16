import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./App";
import Services from "./Pages/Services";
import Blog from "./Pages/blog";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Missing from "./Pages/Missing";
import Postpage from "./Pages/Postpage";
import Newpost from "./Pages/Newpost";
import Heading from "./Pages/Heading";
import Login from "./Pages/Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Navbar />
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/about">
					<About />
				</Route>
				<Route path="/services" element={<Services />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/missing" element={<Missing />} />
				<Route path="/postpage" element={<Postpage />} />
				<Route path="/newpost" element={<Newpost />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals();

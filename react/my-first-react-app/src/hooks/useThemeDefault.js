import { useEffect, useState } from "react";

const useThemeDefault = (initialTheme) => {
	const [theme, setTheme] = useState(() => {
		// If initial theme is provided, use it
		if (initialTheme) return initialTheme;

		// Check localStorage first
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
			return savedTheme;
		}

		// Check system preference
		if (typeof window !== "undefined") {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}

		// Default to light
		return "light";
	});

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleSystemThemeChange = () => {
			// Only update if no theme is saved in localStorage
			if (!localStorage.getItem("theme")) {
				setTheme(mediaQuery.matches ? "dark" : "light");
			}
		};

		// Listen for system theme changes
		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", handleSystemThemeChange);
		} else {
			mediaQuery.addListener(handleSystemThemeChange);
		}

		return () => {
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener(
					"change",
					handleSystemThemeChange,
				);
			} else {
				mediaQuery.removeListener(handleSystemThemeChange);
			}
		};
	}, []);

	return theme; // Return just the theme string
};

export default useThemeDefault;

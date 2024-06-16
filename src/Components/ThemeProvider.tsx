import { useEffect, useState, useCallback, JSX } from "react";
import { ConfigProvider, theme } from "antd";

type ThemeType = {
	children: JSX.Element | JSX.Element[];
};

const ThemeProvider = (props: ThemeType) => {
	const [darkMode, setDarkMode] = useState(false);
	const windowQuery = window.matchMedia("(prefers-color-scheme:dark)");

	const darkModeChange = useCallback((event: MediaQueryListEvent) => {
		setDarkMode(event.matches ? true : false);
	}, []);

	useEffect(() => {
		windowQuery.addEventListener("change", darkModeChange);
		return () => {
			windowQuery.removeEventListener("change", darkModeChange);
		};
	}, [windowQuery, darkModeChange]);

	useEffect(() => {
		setDarkMode(windowQuery.matches ? true : false);
	}, [windowQuery.matches]);

	return <ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.compactAlgorithm }}>{props.children}</ConfigProvider>;
};

export default ThemeProvider;

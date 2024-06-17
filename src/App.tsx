import { BrowserRouter } from "react-router-dom";
// ROUTER
import Router from "src/Router/Router";
// STYLES
import ThemeProvider from "src/Components/ThemeProvider";
import GlobalStyles from "src/Components/GlobalStyles.style";
// PAGES

const App = () => {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Router />
				<GlobalStyles />
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;

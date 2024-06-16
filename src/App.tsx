// STYLES
import ThemeProvider from "src/Components/ThemeProvider";
import GlobalStyles from "src/Components/GlobalStyles.style";
// PAGES
import ViewCSV from "src/Pages/ViewCSV/ViewCSV";

const App = () => {
	return (
		<ThemeProvider>
			<GlobalStyles />
			<ViewCSV />
		</ThemeProvider>
	);
};

export default App;

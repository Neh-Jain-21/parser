import { useRoutes } from "react-router-dom";
// HOOKS
// ROUTES
import { publicRoutes } from "src/Router/Routes";
// SERVICES

const Router = () => {
	const routing = useRoutes(publicRoutes);

	return routing;
};

export default Router;

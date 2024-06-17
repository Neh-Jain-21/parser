import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
// COMPONENTS
import LazyLoad from "src/Components/LazyLoad/LazyLoad";
const Layout = lazy(() => import("src/Components/Layout/Layout"));
// PAGES
const ViewCSV = lazy(() => import("src/Pages/ViewCSV/ViewCSV"));

/** Add your public routes here */
const publicRoutes: RouteObject[] = [
	{
		path: "/",
		element: (
			<Suspense fallback={<LazyLoad />}>
				<Layout />
			</Suspense>
		),
		children: [
			...[
				{ path: "/", component: ViewCSV },
				{ path: "/csv/view", component: ViewCSV },
			].map((child) => ({
				path: child.path,
				element: (
					<Suspense fallback={<LazyLoad />}>
						<child.component />
					</Suspense>
				),
			})),
			{ path: "*", element: <Navigate to="/" replace /> },
		],
	},
];

export { publicRoutes };

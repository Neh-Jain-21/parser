import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";
// STYLES
import LayoutWrapper from "./Layout.style";

const { Header, Content } = AntLayout;

const Layout = () => {
	return (
		<LayoutWrapper>
			<Header className="header">CSV VIEWER</Header>

			<Content className="content">
				<Outlet />
			</Content>
		</LayoutWrapper>
	);
};

export default Layout;

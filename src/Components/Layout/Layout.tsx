import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";

const { Header, Content, Footer } = AntLayout;

const Layout = () => {
	return (
		<AntLayout>
			<Header style={{ display: "flex", alignItems: "center" }}>CSV PARSER</Header>

			<Content style={{ padding: "0 48px" }}>
				<Outlet />
			</Content>

			<Footer style={{ textAlign: "center" }}>{new Date().getFullYear()}</Footer>
		</AntLayout>
	);
};

export default Layout;

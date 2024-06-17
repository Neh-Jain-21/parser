import { Layout } from "antd";
import styled from "styled-components";

const LayoutWrapper = styled(Layout)`
	.header {
		display: flex;
		align-items: center;
	}

	.content {
		padding: 20px;
	}
`;

export default LayoutWrapper;

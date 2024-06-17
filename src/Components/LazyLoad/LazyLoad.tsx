import { Spin, Flex } from "antd";

/** Fallback UI when page is loading. */
const LazyLoad = () => {
	return (
		<Flex style={{ height: "calc(100dvh - 16px)" }} justify="center" align="center">
			<Spin size="large" />
		</Flex>
	);
};

export default LazyLoad;

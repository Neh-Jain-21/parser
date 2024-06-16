import { Spin } from "antd";

/** Fallback UI when page is loading. */
const LazyLoad = () => {
	return (
		<>
			<Spin />
		</>
	);
};

export default LazyLoad;

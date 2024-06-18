import { useState } from "react";
import { Button, Form, FormInstance, FormProps, Input, Select, Space, Table, Tabs, TabsProps } from "antd";
// STYLES
import ViewCSVWrapper from "./ViewCSV.style";
import { csvToArr } from "src/Helpers/utils";

const { TextArea } = Input;

type TextCSVType = {
	csvText: string;
};

type TextPropsType = {
	form: FormInstance<TextCSVType>;
	onFinish: ((values: TextCSVType) => void) | undefined;
};

const Text = (props: TextPropsType) => {
	return (
		<Form form={props.form} name="textCSV" initialValues={{ csvText: "" }} layout="vertical" autoComplete="off" onFinish={props.onFinish}>
			<Form.Item<TextCSVType> label="CSV Text" name="csvText" rules={[{ required: true, message: "Please input csv text!" }]}>
				<TextArea rows={4} placeholder="Paste your CSV text" />
			</Form.Item>

			<Form.Item>
				<Space>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>

					<Button htmlType="reset">Reset</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

const ViewCSV = () => {
	const [delimiterForm] = Form.useForm<TextCSVType>();
	const [textForm] = Form.useForm<TextCSVType>();

	const [activeTab, setActiveTab] = useState("1");
	const [textFormColumns] = useState([]);

	const onFinish: FormProps<TextCSVType>["onFinish"] = (values) => {
		const [headers, array] = csvToArr(values.csvText, delimiterForm.getFieldValue("delimiter"));

		console.log("Success:", headers, array);
	};

	const items: TabsProps["items"] = [
		{ key: "1", label: "Text", children: <Text form={textForm} onFinish={onFinish} /> },
		{ key: "2", label: "File", children: "Content of Tab Pane 2" },
	];

	const handleOnchangeTab = (activeKey: string) => {
		setActiveTab(activeKey);

		textForm.resetFields();
	};

	const dataSource = [
		{ key: "1", name: "Mike", age: 32, address: "10 Downing Street" },
		{ key: "2", name: "John", age: 42, address: "10 Downing Street" },
	];

	const columns = [
		{ title: "Name", dataIndex: "name", key: "name" },
		{ title: "Age", dataIndex: "age", key: "age" },
		{ title: "Address", dataIndex: "address", key: "address" },
	];

	return (
		<ViewCSVWrapper>
			<Form form={delimiterForm} name="delimiter" initialValues={{ delimiter: ";" }} layout="vertical" autoComplete="off">
				<Form.Item label="Delimiter" name="delimiter" required>
					<Select className="delimiter-selector" placeholder="Select Delimiter" options={[",", ";"].map((value) => ({ value, label: value }))} />
				</Form.Item>
			</Form>

			<Tabs size="large" centered activeKey={activeTab} items={items} onChange={handleOnchangeTab} />

			{textFormColumns.length && <Table dataSource={dataSource} columns={columns} />}
		</ViewCSVWrapper>
	);
};

export default ViewCSV;

import { useState } from "react";
import { Button, Form, FormInstance, FormProps, Input, Select, Space, Table, Tabs, TabsProps, Upload, UploadFile } from "antd";
// STYLES
import ViewCSVWrapper from "./ViewCSV.style";
// HELPERS
import { csvToArr } from "src/Helpers/utils";
// ICONS
import { InboxOutlined } from "@ant-design/icons";
// TYPES
import { ColumnsType } from "antd/es/table";
import { AnyObject } from "antd/es/_util/type";

const { TextArea } = Input;
const { Dragger } = Upload;

type TextCSVType = {
	csvText: string;
};

type FileCSVType = {
	file: UploadFile[];
};

type TextPropsType = {
	form: FormInstance<TextCSVType>;
	onFinish: ((values: TextCSVType) => void) | undefined;
	onReset?: React.FormEventHandler<HTMLFormElement> | undefined;
};

type FilePropsType = {
	form: FormInstance<FileCSVType>;
	onFinish: ((values: FileCSVType) => void) | undefined;
	onReset?: React.FormEventHandler<HTMLFormElement> | undefined;
};

const TextForm = (props: TextPropsType) => {
	return (
		<Form form={props.form} name="textCSV" initialValues={{ csvText: "" }} layout="vertical" autoComplete="off" onFinish={props.onFinish} onReset={props.onReset}>
			<Form.Item<TextCSVType> label="CSV Text" name="csvText" rules={[{ required: true, message: "Please input csv text!" }]}>
				<TextArea rows={4} placeholder="Paste your CSV text" />
			</Form.Item>

			<Form.Item>
				<Space>
					<Button type="primary" htmlType="submit">
						View CSV
					</Button>

					<Button htmlType="reset">Reset</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

const FileForm = (props: FilePropsType) => {
	const normFile = (e: [] | { fileList: [] }) => {
		if (Array.isArray(e)) return e;

		return e?.fileList;
	};

	return (
		<Form name="fileCSV" initialValues={{ file: "" }} layout="vertical" autoComplete="off" onFinish={props.onFinish} onReset={props.onReset}>
			<Form.Item label="CSV File" name="file" valuePropName="data" required getValueFromEvent={normFile} rules={[{ required: true, message: "Please upload one image." }]}>
				<Dragger accept=".csv" beforeUpload={() => false} maxCount={1}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">Click or drag file to this area to upload</p>
					<p className="ant-upload-hint">Supports only CSV files.</p>
				</Dragger>
			</Form.Item>

			<Form.Item>
				<Space>
					<Button type="primary" htmlType="submit">
						View CSV
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
	const [fileForm] = Form.useForm<FileCSVType>();

	const [activeTab, setActiveTab] = useState("1");
	const [columns, setColumns] = useState<ColumnsType<AnyObject>>([]);
	const [dataSource, setDataSource] = useState<object[]>([]);

	const onFinish: FormProps<TextCSVType>["onFinish"] = (values) => {
		const { headers, objects } = csvToArr(values.csvText, delimiterForm.getFieldValue("delimiter"));

		setColumns(headers.map((value) => ({ title: value, dataIndex: value, key: value })));
		setDataSource(objects);
	};

	const onReset = () => {
		setColumns([]);
		setDataSource([]);
	};

	const onFileFormFinish: FormProps<FileCSVType>["onFinish"] = (values) => {
		const reader = new FileReader();

		reader.readAsText(values.file[0].originFileObj as Blob);

		reader.onload = async (e: ProgressEvent<FileReader>) => {
			const text = e.target?.result?.toString() || "";

			onFinish({ csvText: text });
		};
	};

	const items: TabsProps["items"] = [
		{ key: "1", label: "Text", children: <TextForm form={textForm} onFinish={onFinish} onReset={onReset} /> },
		{ key: "2", label: "File", children: <FileForm form={fileForm} onFinish={onFileFormFinish} onReset={onReset} /> },
	];

	const handleOnchangeTab = (activeKey: string) => {
		setActiveTab(activeKey);
		setColumns([]);
		setDataSource([]);

		textForm.resetFields();
	};

	return (
		<ViewCSVWrapper>
			<Form form={delimiterForm} name="delimiter" initialValues={{ delimiter: "," }} layout="vertical" autoComplete="off">
				<Form.Item label="Delimiter" name="delimiter" required>
					<Select className="delimiter-selector" placeholder="Select Delimiter" options={[",", ";"].map((value) => ({ value, label: value }))} />
				</Form.Item>
			</Form>

			<Tabs size="large" centered activeKey={activeTab} items={items} onChange={handleOnchangeTab} />

			{columns.length > 0 && <Table size="small" rowKey={columns[0].title?.toString()} dataSource={dataSource} columns={columns} />}
		</ViewCSVWrapper>
	);
};

export default ViewCSV;

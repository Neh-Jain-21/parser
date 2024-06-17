export const csvToArr = (stringVal: string, splitter: string) => {
	const [headerLine, ...lines] = stringVal.split("\n");

	const headers = headerLine.split(splitter).map((value) => value.trim());

	const objects = lines.map((line) => line.split(splitter).reduce((object, value, index) => ({ ...object, [headers[index]]: value.trim() }), {}));

	return [headers, objects];
};

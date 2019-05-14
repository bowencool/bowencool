export const selectFile = ({
	accept = "image/*",
	multiple,
}: { accept?: string; multiple?: boolean } = {}): Promise<FileList> =>
	new Promise(resolve => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = accept;
		if (multiple) input.multiple = multiple;
		input.onchange = (e) => {
			resolve(e.target.files);
		};
		input.click();
	});

export const downloadFile = (blob: Blob, filename?: string): void => {
	const a = document.createElement("a");
	const blobUrl = window.URL.createObjectURL(blob);
	a.href = blobUrl;
	a.download = filename || blob["filename"];
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(blobUrl);
	a.remove();
};

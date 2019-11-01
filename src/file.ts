/**
 * @author Bowen Zhao <z.bowen66@gmail.com>
 * Created at 2019-11-01 10:42:45
 */

export const selectFile = ({
	accept = "image/*",
	multiple = false,
}: { accept?: string; multiple?: boolean } = {}): Promise<FileList> =>
	new Promise(resolve => {
		const input: HTMLInputElement = document.createElement("input");
		input.type = "file";
		input.accept = accept;
		if (multiple) input.multiple = multiple;
		input.onchange = (e: InputEvent) => {
			resolve((e.target as HTMLInputElement).files);
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

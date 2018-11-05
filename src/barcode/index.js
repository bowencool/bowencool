import BARS from "./data.json";

const START_BASE = 38;
const STOP = 106;

const fromType = {
	A(charCode) {
		if (charCode >= 0 && charCode < 32) return charCode + 64;
		if (charCode >= 32 && charCode < 96) return charCode - 32;
		return charCode;
	},
	B(charCode) {
		if (charCode >= 32 && charCode < 128) return charCode - 32;
		return charCode;
	},
	C(charCode) {
		return charCode;
	},
};

const code128Detect = code => {
	if (/^[0-9]+$/.test(code)) return "C";
	if (/[a-z]/.test(code)) return "B";
	return "A";
};

const add = function(nr) {
	const nrCode = BARS[nr];
	this.check = this.length === 0 ? nr : this.check + nr * this.length;
	// console.log("add", nr, nrCode, `${nr}*${this.length}`);
	this.push(nrCode || `UNDEFINED: ${nr} -> ${nrCode}`);
};

export const parseBarcode = barcode => {
	const barcodeType = code128Detect(barcode);
	const bars = [];
	// start A/B/C
	add.call(bars, START_BASE + barcodeType.charCodeAt(0));

	let isOddC = barcodeType === "C" && barcode.length % 2 === 1;
	let theLastOne;
	if (isOddC) {
		theLastOne = barcode.slice(-1, barcode.length);
		barcode = barcode.slice(0, barcode.length - 1);
	}

	for (let i = 0; i < barcode.length; i++) {
		const code =
			barcodeType === "C"
				? +barcode.substr(i++, 2)
				: barcode.charCodeAt(i);
		const converted = fromType[barcodeType](code);
		if (Number.isNaN(converted) || converted < 0 || converted > 106)
			throw new Error(
				`Unrecognized character (${code}) at position ${i} in code "${barcode}".`
			);
		add.call(bars, converted);
	}

	if (isOddC) {
		// code B
		add.call(bars, 100);
		add.call(bars, fromType.B(theLastOne.charCodeAt(0)));
	}
	// check & stop
	bars.push(BARS[bars.check % 103], BARS[STOP]);
	return bars;
};

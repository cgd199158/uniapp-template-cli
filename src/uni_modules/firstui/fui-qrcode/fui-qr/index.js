// 本文件由FirstUI授权予湖北道邦科技有限公司（手机号：    1 858  1 833  064，身份证尾号：AURG00）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
import QRCode from './lib/QRCode.js'
import ErrorCorrectLevel from './lib/ErrorCorrectLevel.js'

var qrcode = function(data, opt) {
	opt = opt || {};
	var qr = new QRCode(opt.typeNumber || -1,
						opt.errorCorrectLevel || ErrorCorrectLevel.H);
	qr.addData(data);
	qr.make();

	return qr;
};

qrcode.ErrorCorrectLevel = ErrorCorrectLevel;

export default qrcode;

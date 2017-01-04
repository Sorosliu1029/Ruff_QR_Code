var QRCodeLib = require('./qrcode-draw');
var QRCodeDraw = QRCodeLib.QRCodeDraw;
function drawBitArray(text, cb) {
    var drawInstance = new QRCodeDraw();
    drawInstance.drawBitArray(text, function(error, bits) {
        cb(error, bits);
    })
}

exports.drawBitArray = drawBitArray;
var QRCodeLib = require('./qrcode-draw');
var QRCodeDraw = QRCodeLib.QRCodeDraw;
function drawBitArray(text, cb) {
    var drawInstance = new QRCodeDraw();
    drawInstance.drawBitArray(text, function(error, bytes) {
        cb(error, bytes);
    })
}

module.exports.generate = drawBitArray;
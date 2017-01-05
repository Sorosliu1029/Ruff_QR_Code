var QRCodeLib = require('./qrcode');
exports.QRCodeDraw = QRCodeDraw;

function QRCodeDraw() {}

QRCodeDraw.prototype = {
    scale: 4,
    defaultMargin: 20,
    marginScaleFactor: 5,
    color: {
        dark: 'black',
        light: 'white'
    },
    drawBitArray: function (text, cb) {
        var error;
        if (typeof cb !== 'function') {
            throw new Error('callback required as last argument');
        }
        try {
            var qr = new QRCodeLib(8, 2);
            var rl = 0;
            var cl = 0;
            var bytes;
            var bytec = 0;

            qr.addData(text);
            qr.make();

            cl = qr.getModuleCount();
            rl = Math.floor(cl / 8);
            bytes = new Array(rl * cl);

            for (var r = 0; r < rl; r++) {
                for (var c = 0; c < cl; c++) {
                    var byte = 0;
                    var s = r * 8;
                    for (var p = s + 7; p >=  s; p--) {
                        byte = (byte << 1) | qr.isDark(p, c);
                    }
                    bytes[bytec] = byte;
                    bytec++;
                }
            }
        } catch (e) {
            error = e;
            console.error(e.stack);
        }
        cb({qrcode: bytes, height: rl, width: cl});
    },
}
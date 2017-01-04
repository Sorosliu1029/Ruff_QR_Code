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
            var width = 0;
            var bits;
            var bitc = 0;

            qr.addData(text);
            qr.make();

            width = this.dataWidth(qr, 1);
            bits = new Array(width * width);
            
            // TODO: convert to bytes
            for (var r = 0, rl = qr.getModuleCount(); r < rl; r++) {
                for (var c = 0, cl = qr.getModuleCount(); c < cl; c++) {
                    if (qr.isDark(r, c)) {
                        bits[bitc] = 1;
                    } else {
                        bits[bitc] = 0;
                    }
                    bitc++;
                }
            }
        } catch (e) {
            error = e;
            console.error(e.stack);
        }
        cb(error, bits, width);
    },

    dataWidth: function (qr, scale) {
        return qr.getModuleCount() * (scale || this.scale || 4)
    },
}
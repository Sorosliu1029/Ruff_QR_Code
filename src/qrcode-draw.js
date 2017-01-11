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
            var qr = new QRCodeLib(1, 2);
            var rl = 0;
            var cl = 0;
            var bytes;
            var bytec = 0;

            qr.addData(text);
            qr.make();

            cl = qr.getModuleCount();
            rl = cl;
            ecl = cl * 3;
            erl = rl * 3 + 1;
            var bits = new Array(ecl * erl);

            for (var r = 0; r < rl; r++) {
                for (var c = 0; c < cl; c++) {
                    var color = qr.isDark(r, c);
                    for(var ir = 0; ir < 3; ir++) {
                        for (var ic = 0; ic < 3; ic++) {
                            bits[(r * 3 + ir) * ecl + (c * 3 + ic)] = color;
                        }
                    }
                }
            }
            for (var c = 0; c < ecl; c ++) {
                bits[(rl * 3) * ecl + c] = false;
            }

            var brl = Math.floor(erl / 8);
            bytes = new Array(brl * ecl);
            for (var r = 0; r < brl; r++) {
                for (var c = 0; c < ecl; c++) {
                    var byte = 0;
                    var s = r * 8;
                    for (var p = s + 7; p >=  s; p--) {
                        byte = (byte << 1) | bits[p * ecl + c];
                    }
                    bytes[bytec] = byte;
                    bytec++;
                }
            }
        } catch (e) {
            error = e;
            console.error(e.stack);
        }
        cb(error, {
            qrcode: bytes,
            height: erl,
            width: ecl
        });
    },
}
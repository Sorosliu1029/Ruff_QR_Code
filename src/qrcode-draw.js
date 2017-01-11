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
            var qr = new QRCodeLib(2, 1);
            var rl = 0;
            var cl = 0;
            var bytes;
            var bytec = 0;

            qr.addData(text);
            qr.make();

            cl = qr.getModuleCount();
            rl = cl;

            var mul_f = 2;
            var ecl = cl * mul_f;
            var erl = Math.ceil(rl * mul_f / 8) * 8;
            var bits = new Array(ecl * erl);

            for (var r = 0; r < rl; r++) {
                for (var c = 0; c < cl; c++) {
                    var color = qr.isDark(r, c);
                    for (var ir = 0; ir < mul_f; ir++) {
                        for (var ic = 0; ic < mul_f; ic++) {
                            bits[(r * mul_f + ir) * ecl + (c * mul_f + ic)] = color;
                        }
                    }
                }
            }
            var remain_rl = erl - rl * mul_f;
            for (var r = rl; r < rl + remain_rl; r++) {
                for (var c = 0; c < ecl; c++) {
                    bits[(rl * mul_f) * ecl + c] = false;
                }
            }

            var brl = Math.floor(erl / 8);
            bytes = new Array(brl * ecl);
            for (var r = 0; r < brl; r++) {
                for (var c = 0; c < ecl; c++) {
                    var byte = 0;
                    var s = r * 8;
                    for (var p = s + 7; p >= s; p--) {
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
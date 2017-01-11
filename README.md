# ruff_qrcode

Qrcode generation module for OLED on Ruff

Should cooperate with [OLED device](https://rap.ruff.io/raps/ssd1306)

This module is based on nodejs package [node-qrcode](https://github.com/soldair/node-qrcode) but removes graphics display for qrcode.

## Supported Engines

* Ruff: >= 1.6.0

## Install

```sh
rap install ruff_qrcode
```

## Usage

Here's a simple example:

```js
oled = $('#oled');
qr.generate("https://ruff.io", function(err, qrcode) {
   oled.printQrcode(39, 1, qrcode);
})
```

Please refer to source code for supported APIs.

## API References

### Methods

#### `generate(text, callback)`

generate qrcode from text, and display qrcode in callback function

- **text:** (type: string)

    the text that would be scanned out from qrcode.
    could be: 
    - raw string, like "qrcode is amazing"
    - web url, like "https://ruff.io"
    
- **callback:** (type: function)
    
    the callback, parameters are `(error, qrcode)`
    
## FAQ

1. Which qrcode version is this module used?
   This module uses version 2. The original qrcode is 25 * 25 pixel, and is magnified to 50 * 50 pixel.
   
2. Which error correction level is this module used?
    This module uses L level correction, which means only 7% data error could be corrected.
    
3. How many ascii characters could the `text` parameter contains?
    The text could contain **32** characters at maximum.
    
## License

The MIT License (MIT)

Copyright (c) 2017 Soros Liu.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


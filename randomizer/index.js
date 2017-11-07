const crypto = require("crypto");

module.exports = function (context, req) {
    const buf = crypto.randomBytes(16);
    context.log(`${buf.length} bytes of random data: ${buf.toString("hex")}`);
    let acceptLanguage = req.headers["accept-language"];
    let locale = "sv-SE";
    if(acceptLanguage) {
        let langs = acceptLanguage.split(",");
        if(langs[0]) {
            locale = langs[0];
        }
    }
    context.log(`Locale: ${locale}`);
    let number = buf.readUInt16BE().toLocaleString(locale);
    context.log(`Number: ${number}`);

    context.res = {
        body: number,
        headers: {
            "Content-Type": "text/plain"
        }
    };
    context.done();
};
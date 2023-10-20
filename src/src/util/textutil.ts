export function getDate() {
    const date = new Date();
    var dateStr =
        date.getFullYear() +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        ("00" + date.getDate()).slice(-2) +
        ("00" + date.getHours()).slice(-2) +
        ("00" + date.getMinutes()).slice(-2) +
        ("00" + date.getSeconds()).slice(-2);
    return dateStr;
}

export function getFormatedDate() {
    const date = new Date();
    var dateStr =
        date.getFullYear() + '-' +
        ("00" + (date.getMonth() + 1)).slice(-2) + '-' +
        ("00" + date.getDate()).slice(-2) + ' ' +
        ("00" + date.getHours()).slice(-2) + ':' +
        ("00" + date.getMinutes()).slice(-2) + ':' +
        ("00" + date.getSeconds()).slice(-2);
    return dateStr;
}

export function buildTrxNum() {
    const date = new Date();
    var dateStr =
        date.getFullYear() +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        ("00" + date.getDate()).slice(-2) +
        ("00" + date.getHours()).slice(-2) +
        ("00" + date.getMinutes()).slice(-2) +
        ("00" + date.getSeconds()).slice(-2);
    return 'SDK-' + dateStr;
}

export function getFileName(data: string) {
    let uriArray = data.split("/");
    let fileName = uriArray[uriArray.length - 1];
    return fileName
}

export function formatBOD(v: string) {
    let string = v.replaceAll('/', '-')
    console.log(string)
    return string
}

export function formatBOD2(v: string) {
    let dd = v.substring(8, 10)
    let mm = v.substring(5, 7)
    let yyyy = v.substring(0, 4)
    return `${dd}-${mm}-${yyyy}`
}

export function encodeAuth(v: string) {
    var utf8 = require('utf8');
    const Buffer = require("buffer").Buffer;
    let encodedAuth = new Buffer(utf8.encode(v)).toString("base64");
    return encodedAuth
}
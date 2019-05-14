function arrayToString(array) {
    return String.fromCharCode.apply(null, new Uint16Array(array.buffer));
}

function stringToArray(string) {
    var buffer = new ArrayBuffer(string.length * 2); // 2 bytes for each char
    var array = new Uint16Array(buffer);
    for (var i = 0, strLen = string.length; i < strLen; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array;
}

function concatInitDataIdAndCertificate(initData, assetId, cert) {
    // layout is [initData][4 byte: idLength][idLength byte: id][4 byte:certLength][certLength byte: cert]
    var offset = 0;
    var buffer = new ArrayBuffer(initData.byteLength + 4 + assetId.byteLength + 4 + cert.byteLength);
    var dataView = new DataView(buffer);

    var initDataArray = new Uint8Array(buffer, offset, initData.byteLength);
    initDataArray.set(initData);
    offset += initData.byteLength;

    dataView.setUint32(offset, assetId.byteLength, true);
    offset += 4;

    var idArray = new Uint16Array(buffer, offset, assetId.length);
    idArray.set(assetId);
    offset += idArray.byteLength;

    dataView.setUint32(offset, cert.byteLength, true);
    offset += 4;

    var certArray = new Uint8Array(buffer, offset, cert.byteLength);
    certArray.set(cert);

    return new Uint8Array(buffer, 0, buffer.byteLength);
}

const fetchCertificate = ({ certificateUrl, callback }) => {
    fetch(certificateUrl, { responseType: 'arraybuffer', })
        .then(response => {
            response.arrayBuffer().then(certArrayBuffer => {
                licenseData = new Uint8Array(certArrayBuffer);
                callback(null, licenseData)
            })
        })
        .catch(error => {
            callback(errors)
        })
}

function fetchLicense({ message, licenseUrl, callback }) {
    fetch(licenseUrl, {
        method: 'POST',
        responseType: 'arraybuffer',
        body: message,
        headers: {
            'Content-Type': 'application/octet-stream'
        }
    })
        .then(response => {
            response.arrayBuffer().then(certArrayBuffer => {
                licenseData = new Uint8Array(certArrayBuffer);
                callback(null, licenseData)
            })
        })
        .catch(error => {
            callback(errors)
        })
}
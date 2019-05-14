const videoElement = document.getElementById('video')

function attemptPlayback() {
    laodFariplayStream({
        licenseUrl: document.getElementById('licenseUrl').value,
        certificateUrl: document.getElementById('certificateUrl').value,
        playbackUrl: document.getElementById('manifestUrl').value,
        videoElement
    })
}
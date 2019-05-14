
// ERROR EVENTS
function onLicenseRequestFailed(event) {
    let errorStr = '';
    if (event.target && event.target.error) {
        errorStr = 'Event error code: ' + event.target.error.code + ' - Event error message: ' + event.target.error.message
    }
    console.error('License', 'KO', errorStr);
    throw new Error(errorStr);
}

function onKeyAdded(event) {
    console.error('key added successfully')
}

function onKeyError(event) {
    let errorStr = '';
    if (event.target && event.target.error) {
        errorStr = 'Event error code: ' + event.target.error.code + ' - Event error message: ' + event.target.error.message
    }
    console.error('Key', 'KO', errorStr);
    throw new Error(errorStr);
}

function onPlaybackError(event) {
    const errorStr = '';
    if (event.target && event.target.error) {
        errorStr = 'Event error code: ' + event.target.error.code + ' - Event error message: ' + event.target.error.message
    }
    console.error('Playback', 'KO', errorStr);
    throw new Error(errorStr);
}

function laodFariplayStream({
    licenseUrl,
    certificateUrl,
    playbackUrl,
    videoElement
}) {

    let certificateData = null;

    // SUCCESS EVENTS
    function onPlaybackNeedKey(event) {
        const video = event.target;
        if (video) {
            if (!video.webkitKeys) {
                video.webkitSetMediaKeys(new WebKitMediaKeys("com.apple.fps.1_0"));
            }
            else {
                throw new Error('not supported')
            }
        }
        else {
            throw new Error('video not found')
        }

        const initData = event.initData;
        const initDataAsString = arrayToString(initData);

        const contentId = initDataAsString.split("skd://")[1].split("?")[0];

        const skdValueAsBytes = stringToArray(contentId);

        const initDataForFairPlay = concatInitDataIdAndCertificate(initData, skdValueAsBytes, certificateData);

        const keySession = video.webkitKeys.createSession("video/mp4", initDataForFairPlay);

        keySession.addEventListener('webkitkeymessage', ({ target, message }) => {
            fetchLicense({
                message,
                licenseUrl: (licenseUrl + contentId), // appending asset id with license url
                callback: (error, licenseData) => {
                    if (error) {
                        console.error('error while getting license', error)
                        return
                    }

                    // updating license data
                    target.update(new Uint8Array(licenseData));
                }
            })
        }, false);

        keySession.addEventListener('webkitkeyadded', onKeyAdded, false);
        keySession.addEventListener('webkitkeyerror', onKeyError, false);
    }

    function startPlayback(videoElement) {
        videoElement.addEventListener('webkitneedkey', onPlaybackNeedKey, false);
        videoElement.addEventListener('error', onPlaybackError, false);
        videoElement.src = playbackUrl;
        videoElement.play();
    }

    fetchCertificate({
        certificateUrl,
        callback: (error, responseData) => {
            certificateData = responseData;
            startPlayback(videoElement);
        }
    })

}
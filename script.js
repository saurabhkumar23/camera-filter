let videoElem = document.querySelector('video');
let recordBtn = document.querySelector('button');
let isRecording = false;
let mediaRecordingObjectForCurrStream;
let recording = [];

// get stream? - mediaDevicesAPI
// first ask for permission then get it.
// record stream? - mediaRecorderAPI
// start the recording, then it takes data from a stream and delivering it to you by 
// a series of dataavailable events which fired automatically when buffer is filled.

let constraints = { // requirements
    audio: true,
    video: true
}
let userMediaPromise = navigator.mediaDevices.getUserMedia(constraints); // browser ask permission
userMediaPromise.then(function (stream) { // if user allows, we get stream
        //videoElem.srcObject = stream                                    // UI - give it to video element.
        mediaRecordingObjectForCurrStream = new MediaRecorder(stream) // attach stream for recording
        mediaRecordingObjectForCurrStream.ondataavailable = function (e) {
            recording.push(e.data) // get recording on data available
        }
        mediarecordingObjectForCurrStream.addEventListener("stop", function () { // when rec stop, download it
            // recording -> url convert 
            // type -> MIME type (extension)
            const blob = new Blob(recording, {
                type: 'video/mp4'
            });
            const url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.download = "file.mp4";
            a.href = url;
            a.click();
            recording = [];
        });
    })
    .catch(function (err) {
        alert('first, please allow both of them.');
    });

recordBtn.addEventListener('click', function () {
    if (mediaRecordingObjectForCurrStream == undefined) { // if stream not attached
        alert('first select the devices');
        return;
    }
    if (isRecording == false) {
        mediaRecordingObjectForCurrStream.start(); // recording start
        recordBtn.innerText = 'Recording...';
    } else {
        mediaRecordingObjectForCurrStream.stop(); // recording stop
        recordBtn.innerText = 'Record';
    }
    isRecording = !isRecording

});
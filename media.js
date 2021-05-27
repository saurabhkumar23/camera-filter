// objective 1 : show myself on HTML page?       ask permission --> get stream --> set on html video tag
// objective 2 : record my video?    
//             attach my video --> start rec --> 
//             wait for buffer to fill --> ondataavailable fires --> save rec           <--- continues....
//             rec stop --> onstop fires --> download rec
// API used:
// mediaDevices - ask permission, get stream
// MediaRecorder - record my video

let videoElem = document.querySelector('.video')
let recordBtn = document.querySelector('.record')

let mediaRecordingObjectForCurrStream
let isRecording = false
let recording = []

let constraints = { // permission req.
    audio: true,
    video: true
}
let userMediaPromise = navigator.mediaDevices.getUserMedia(constraints)    // ask permission
userMediaPromise.then(function(stream) {                                  // get stream
        videoElem.srcObject = stream                                   // set on html video tag 
        mediaRecordingObjectForCurrStream = new MediaRecorder(stream) // attach my video
        mediaRecordingObjectForCurrStream.ondataavailable = function (e) {         // ondataavailable fires
            recording.push(e.data)                                     // save rec
        }
        mediaRecordingObjectForCurrStream.onstop = function () {              // onstop fires
            // recording -> url convert 
            // type -> MIME type (extension)
            const blob = new Blob(recording, {                             // download rec
                type: 'video/mp4'
            });
            const url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.download = "file.mp4";
            a.href = url;
            a.click();
            recording = []; 
        }
    })
    .catch(function(err) {
        alert('first, please allow both of them.')
        console.log(err)
    })

// handle recording
recordBtn.addEventListener('click', function () {
    if (mediaRecordingObjectForCurrStream == undefined) { // if video not attached
        alert('first select the devices')
        return
    }
    if (isRecording == false) {
        mediaRecordingObjectForCurrStream.start()                //  start rec
        recordBtn.innerText = 'Recording...';
    } else {
        mediaRecordingObjectForCurrStream.stop()                 // stop rec
        recordBtn.innerText = 'Record';
    }
    isRecording = !isRecording
});

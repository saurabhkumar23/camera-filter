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
let timerDiv = document.querySelector('.timer')
let timerController;
let secs = 0
let mins = 0
let hrs = 0

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
        startTimer();
    } else {
        mediaRecordingObjectForCurrStream.stop()                 // stop rec
        recordBtn.innerText = 'Record';
        stopTimer();
    }
    isRecording = !isRecording
});

// start time
function startTimer(){
    timerController = setInterval(() => {
        if(secs == 59){
            secs = 0
            if(mins == 59){
                mins = 0
                if(hrs == 23){
                    hrs = 0
                }
                else{
                    hrs++
                }
            }
            else{
                mins++
            }
        }
        else{
            secs++
        }
        timerDiv.innerText = `${hrs<10 ? '0'+hrs : hrs}:${mins<10 ? '0'+mins : mins}:${secs<10 ? '0'+secs : secs}`
    },1000)
}

// stops time
function stopTimer(){
    clearInterval(timerController);             // stops the timer
    hrs = 0                                   // set to zeros
    mins = 0
    secs = 0
    timerDiv.innerText = `${hrs<10 ? '0'+hrs : hrs}:${mins<10 ? '0'+mins : mins}:${secs<10 ? '0'+secs : secs}`
}


/////////////////////// canvas //////////////////////////

let captureImgBtn = document.querySelector('.click-image')
let filterColorsArr = document.querySelectorAll('.filter')
let overlay = document.querySelector('.filter_overlay')
let filterColor;


// click image
captureImgBtn.addEventListener('click',function(){
    let canvas = document.createElement('canvas') // create canvas
    canvas.height = videoElem.videoHeight
    canvas.width = videoElem.videoWidth
    let tool = canvas.getContext('2d')
    tool.drawImage(videoElem,0,0)  // draw video on canvas
    if(filterColor){             // if filtered color chosen
        tool.fillStyle = filterColor
        tool.fillRect(0,0,canvas.width,canvas.height)
    }
    let url = canvas.toDataURL()  // download canvas
    let a = document.createElement('a')
    a.download = 'file.png'
    a.href = url
    a.click()
    a.remove()
})

// set filter on video
for(let i=0;i<filterColorsArr.length;i++){
    filterColorsArr[i].addEventListener('click',function(){
        filterColor = filterColorsArr[i].style.backgroundColor
        overlay.style.backgroundColor = filterColor
    })
}





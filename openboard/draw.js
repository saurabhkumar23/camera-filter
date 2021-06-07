let isDrawStart = false
let tool = board.getContext('2d')   // get tool

board.height = window.innerHeight    // setting height n width of canvas
board.width = window.innerWidth

// start drawing 
window.addEventListener('mousedown',function(e){  
    isDrawStart = true                               // drawing starts
    tool.beginPath()                                 // set correct drawing pointer on canvas
    tool.moveTo(e.clientX,getY(e.clientY))
})

// drawing....
window.addEventListener('mousemove',function(e){
    if(isDrawStart){               // if drawing has been started else no event
        tool.lineTo(e.clientX,getY(e.clientY))                             // drawing continues...
        tool.stroke()
    }
})

// end drawing
window.addEventListener('mouseup',function(){    
    isDrawStart = false                           // drawing now finished
})

// get correct Y coord for canvas drawing
function getY(originalY){
    let heightOfMenu  = menu.getBoundingClientRect().height  // give height of menu
    return originalY-heightOfMenu
}


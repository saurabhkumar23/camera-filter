// get clicked color from menu and set stroke
for(let i=0;i<colors.length;i++){
    colors[i].addEventListener('click',function(){
        let color = colors[i].classList[1]
        tool.strokeStyle = color               // set stroke to that color
    })
}

// download canvas drawing
downloadBtn.addEventListener('click',function(){
    let url = board.toDataURL()                        // canvas give url of drawing image
    let a = document.createElement('a')               // <a download="file.png" href="url"></a>
    a.download = 'file.png'
    a.href = url
    a.click()
    a.remove()
})
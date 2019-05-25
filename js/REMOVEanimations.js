
function blurr(e){
e.mouseover(function() {
  console.log(e)
  })

  e.mouseout(function() {
      console.log(this)
    })
}


//Accrodion Behavior
let section = document.querySelectorAll(".accordion");
let aRRay = Array.from(section);

aRRay.map((items) => {
  items.addEventListener("click", function(){
      
    items.classList.toggle("active");
    let nextdiv = items.nextElementSibling;

    if(nextdiv.style.display == "block"){
      nextdiv.style.display = "none"
    }else{
      nextdiv.style.display = "block"
    }

    if ( nextdiv.style.maxHeight) {
      nextdiv.style.maxHeight = null;
    } else {
      nextdiv.style.maxHeight = nextdiv.scrollHeight + "px";
    } 

  })
})
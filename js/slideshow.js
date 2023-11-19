var slider=document.querySelector('#slider')
var slides = slider.getElementsByClassName("slide");
var currentIndex = 0;
function renderSlide(){
  var bannerItem=[]
  for(let i=0;i<4;i++){
    bannerItem.push(`<div class="slide"></div>`)
  }
  slider.innerHTML=bannerItem.join('')
  var slides=document.querySelectorAll('.slide')
  for(let i=0;i<slides.length;i++){
    slides[i].style.background=`url('../assets/images/img${i}.jpg')  no-repeat  `
  }
  for(let slide of slides){
    if(slide!==slides[0]){
        slide.style.transition = "none";
        slide.style.transform="translateX(-100%)"
    }
  }
}
function moveToNextSlide() {
  var currentSlide = slides[currentIndex];
  var nextIndex = (currentIndex + 1) % slides.length;
  var nextSlide = slides[nextIndex];
  
  nextSlide.style.transform = "translateX(100%)";
  nextSlide.style.transition = "none";
  
  setTimeout(function() {
    currentSlide.style.transform = "translateX(-100%)";
    currentSlide.style.transition = "transform 0.5s ease";
    
    nextSlide.style.transform = "translateX(0)";
    nextSlide.style.transition = "transform 0.5s ease";
    
    currentIndex = nextIndex;
  }, 100);
}
function moveToSlide(index,arrow) {
  if (index < 0 || index >= slides.length) {
    return;
  }
  
    var currentSlide = slides[currentIndex];
   var nextSlide = slides[index];
  if(arrow==='next'){

  currentSlide.style.transform = "translateX(-100%)";
  currentSlide.style.transition = "transform 0.5s ease";
  nextSlide.style.transform = "translateX(0)";
  nextSlide.style.transition = "transform 0.5s ease";}
  else{

  currentSlide.style.transform = "translateX(100%)";
  currentSlide.style.transition = "transform 0.5s ease";
  nextSlide.style.transform = "translateX(0)";
  nextSlide.style.transition = "transform 0.5s ease";
  }
  currentIndex = index;
}
function handleClick(){
  document.querySelector(".prev").addEventListener("click", function() {
    var index = (currentIndex - 1 + slides.length) % slides.length;
      var currentSlide = slides[currentIndex];
     var nextSlide = slides[index];
      nextSlide.style.transition = "none";
    nextSlide.style.transform = "translateX(-100%)";
    setTimeout(function(){ moveToSlide(index,'prev');},100)
   
  });
  document.querySelector(".next").addEventListener("click", function() {
    var index = (currentIndex + 1) % slides.length;
        var currentSlide = slides[currentIndex];
     var nextSlide = slides[index];
      nextSlide.style.transition = "none";
    nextSlide.style.transform = "translateX(100%)";
   setTimeout(function(){ moveToSlide(index,'next');},100)
  });
  
}
renderSlide()
setInterval(moveToNextSlide, 5000);
handleClick()
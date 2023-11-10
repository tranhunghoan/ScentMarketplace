document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 1;
    const totalSlides = 3;
    const slideDuration = 2000; // Thời gian giữa các chuyển đổi (5 giây trong ví dụ này)
  
    function nextSlide() {
      currentSlide = (currentSlide % totalSlides) + 1;
      document.getElementById(`banner-${currentSlide}-th`).checked = true;
    }
  
    setInterval(nextSlide, slideDuration);
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const barIcon = document.getElementById("bar");
    const menuList = document.querySelector(".menu-list");
  
    barIcon.addEventListener("click", function() {
      menuList.classList.toggle("active");
    });
  });
  
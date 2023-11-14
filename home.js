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
    document.getElementById("bar").addEventListener("click", function () {
        console.log("Clicked #bar");
        var menuList = document.querySelector('.menu-list');
        menuList.classList.toggle('active');

        var icons = document.querySelectorAll('.mobile .icons');
        icons.forEach(function(icon) {
            icon.style.display = 'none';
        });

        document.getElementById("xmark").style.display = 'initial';
        console.log("#xmark displayed");
    });

    document.getElementById("xmark").addEventListener("click", function () {
        console.log("Clicked #xmark");
        var menuList = document.querySelector('.menu-list');
        menuList.classList.remove('active');

        var icons = document.querySelectorAll('.mobile .icons');
        icons.forEach(function(icon) {
            icon.style.display = 'flex';
        });

        document.getElementById("xmark").style.display = 'none';
        console.log("#xmark hidden");
    });

});
document.addEventListener("DOMContentLoaded", function() {
  var currentPageUrl = window.location.href;

  // Find all links in the menu
  var menuLinks = document.querySelectorAll('.menu-list li a');

  // Loop through the links and add the "active" class to the link with a matching href
  menuLinks.forEach(function(link) {
    if (link.href === currentPageUrl) {
      link.classList.add('active');
    }
  });
});
//check password
document.addEventListener('DOMContentLoaded', function () {
  var regisForm = document.getElementById('form-register');

  regisForm.addEventListener('submit', function (event) {
      var password = document.getElementById("password").value;
      var confirmPassword = document.getElementById("confirm-password");
      var errorContainer = document.getElementById('password-error');

      if (password !== confirmPassword.value) {
          errorContainer.textContent = "Mật khẩu nhập lại không khớp!";
          event.preventDefault(); 
      } else {
          errorContainer.textContent = ""; 
      }
  });
});


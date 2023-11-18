//banner
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

//dropdown navbar
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

// giữ trạng thái trang truy cập trang
document.addEventListener("DOMContentLoaded", function() {
  var currentPageUrl = window.location.href;
  var menuLinks = document.querySelectorAll('.menu-list li a');
  menuLinks.forEach(function(link) {
    if (link.href === currentPageUrl) {
      link.classList.add('active');
    }
  });
});

//chuyển hướng trang đăng nhập
//đăng ký, kiểm tra password
function formregis(){
  location.assign("./register.html");
}
document.addEventListener('DOMContentLoaded', function () {
  var regisForm = document.getElementById('form-register');

  regisForm.addEventListener('submit', function (event) {
      var password = document.getElementById("pass").value;
      var confirmPassword = document.getElementById("repass");
      var errorContainer = document.getElementById('password-error');

      if (password !== confirmPassword.value) {
          errorContainer.textContent = "Mật khẩu nhập lại không khớp!";
          event.preventDefault(); 
      } else {
          errorContainer.textContent = ""; 
          return regis(event);
      }
  });
});
function regis(event){
  event.preventDefault();
  var username=document.getElementById("username").value;
  var email=document.getElementById("email").value;
  var tel=document.getElementById("tel").value;
  var password=document.getElementById("pass").value;
  var repass=document.getElementById("repass").value;
  var user ={
    username: username,
    email: email,
    tel:tel,
    password: password,
    repass: repass,
  };
  var json = JSON.stringify(user);
  localStorage.setItem(username, json);
  window.location.href = "./login.html";

  // Return false to prevent the default form submission
  return false;
}
//Đăng nhập
document.addEventListener('DOMContentLoaded', function () {
  
  var loginForm = document.getElementById('form-login');
  loginForm.addEventListener('submit', function (event) {
    var userName = document.getElementById('username').value;
    var userPass = document.getElementById('password').value;
    var errorContainer = document.getElementById('account-null');

    if ((!userName || !userPass)) {
      errorContainer.textContent = "Bạn chưa nhập tên đăng nhập hoặc mật khẩu!";
      event.preventDefault();
    } else {
      errorContainer.textContent = "";
      var loginResult = login();
      if (!loginResult) {
        errorContainer.textContent = "Tài khoản đăng nhập chưa chính xác!";
        localStorage.setItem('isLoggedIn', 'false');
        event.preventDefault();
      }
      else{
        localStorage.setItem('isLoggedIn', 'true');
      }
    }
  });

});

function login() {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var user = localStorage.getItem(username);
  var data = JSON.parse(user);
  
  if (username == data.username && password == data.password) {
    localStorage.setItem('isLoggedIn', 'true');

    window.location.href = "./home.html";
    return true;
  }
  else{
    localStorage.setItem('isLoggedIn', 'false');
  }
  return false;
}
function onLoginSuccess() {
  var userLink = document.getElementById('user-link');
  userLink.addEventListener('click', function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      userLink.href = './user.html';
    } 
    else {
      userLink.href = './login.html';
    }
  });
}

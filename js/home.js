//banner
document.addEventListener("DOMContentLoaded", function() {
  let currentSlide = 1;
  const totalSlides = 3;
  const slideDuration = 5000; 

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

//đăng ký, kiểm tra password
//eye-login
import { user } from "./datauser.js"; 
document.addEventListener('DOMContentLoaded', function () {
  var passwordInput = document.getElementById('password');
  var togglePassword = document.getElementById('toggle-password');

  togglePassword.addEventListener('click', function () {
      var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
  });
});
//eye-regis
document.addEventListener('DOMContentLoaded', function () {
  var passwordInput = document.getElementById('pass');
  var togglePassword = document.getElementById('toggle-password');

  togglePassword.addEventListener('click', function () {
      var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var passwordInput = document.getElementById('repass');
  var togglePassword = document.getElementById('rtoggle-password');

  togglePassword.addEventListener('click', function () {
      var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
  });
});

function formregis(){
  document.getElementById('register-button').addEventListener("click", function () {
    location.assign("./register.html");
  });
}
function regis(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var tel = document.getElementById("tel").value;
  var password = document.getElementById("pass").value;
  var address = document.getElementById("address").value;
  // Tạo đối tượng người dùng mới
  var newUser = {
    username: username,
    tel: tel,
    email: email,
    address: address,
    password: password
  };
  user.push(newUser);
  localStorage.setItem('isLoggedIn', 'false');
  window.location.href = "./login.html";
  return false;
}

document.addEventListener('DOMContentLoaded', function () {
  var regisForm = document.getElementById('form-register');
  regisForm.addEventListener('submit', function (event) {
      var password = document.getElementById("pass").value;
      var confirmPassword = document.getElementById("repass").value;
      var errorContainer = document.getElementById('password-error');

      if (password !== confirmPassword) {
          errorContainer.textContent = "Mật khẩu nhập lại không khớp!";
          event.preventDefault(); 
      } else {
          errorContainer.textContent = ""; 
          return regis(event);
      }
  });
});

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
      var loginResult = login(userName, userPass);
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

function login(userName,userPass) {
    return user.find(function (u) {
      return u.username === userName && u.password === userPass;
  });
}
document.addEventListener('DOMContentLoaded', function () {
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
});

// // lấy dữ liệu cho user
document.addEventListener('DOMContentLoaded', function () {
  
  var usernameInput = document.getElementById('username-l');
  var emailInput = document.getElementById('email-l');
  var telInput = document.getElementById('tel-l');
  var passInput = document.getElementById('pass-l');
  var addressInput = document.getElementById('address-l')

  usernameInput.value = data.username;
  emailInput.value = data.email;
  telInput.value = data.tel;
  passInput.value = data.password;
  addressInput.value = data.address;
});

document.addEventListener('DOMContentLoaded', function () {
  var passwordInput = document.getElementById('pass-l');
  var togglePassword = document.getElementById('toggle-password');

  togglePassword.addEventListener('click', function () {
  console.log('Clicked on the eye icon');
  var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  });
  });

document.addEventListener('DOMContentLoaded', function () {
  var userForm = document.getElementById('user-form');

  userForm.addEventListener('submit', function (event) {
  event.preventDefault();

  var username = document.getElementById('username-l').value;
  var email = document.getElementById('email-l').value;
  var tel = document.getElementById('tel-l').value;
  var password = document.getElementById('pass-l').value;
  var address = document.getElementById('address-l').value;

  var currentUser = localStorage.getItem(username);
  var userData = JSON.parse(currentUser);
  
  userData.username = username;
  userData.email = email;
  userData.tel = tel;
  userData.password = password;
  userData.repass = password;
  userData.address = address;

  localStorage.setItem(username, JSON.stringify(userData));

  alert('Thông tin đã được cập nhật thành công!');
});
});
document.addEventListener('DOMContentLoaded', function () {
  var logoutbutton= document.getElementById("logout");
  logoutbutton.addEventListener('click', function(){
    localStorage.setItem('isLoggedIn', 'false');
      window.location.href = './home.html';
  }) 
});

function start(){
  formregis()
}
start()
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
document.addEventListener('DOMContentLoaded', function () {
  var passwordInput = document.getElementById('pass-l');
  var togglePassword = document.getElementById('toggle-password');

  togglePassword.addEventListener('click', function () {
  console.log('Clicked on the eye icon');
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
  //localStorage.setItem('user', JSON.stringify(user));
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
var currentUser="nnnnn";
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
        currentUser = userName;
      }
    }
  });
});

function login(userName,userPass) {
    return user.find(function (u) {
      return u.username === userName && u.password === userPass;
  });
}
function loadUser(){
  document.getElementById('pro-user').textContent = currentUser;
}
document.addEventListener('DOMContentLoaded', function () {
  var userLink = document.getElementById('user-link');
  var mUserLink=document.getElementById('m-user-link');
  var isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn === 'true') {
    // Nếu đăng nhập, hiển thị icon user
    userLink.innerHTML = '<i class="fa-solid fa-user"></i>';
    mUserLink.innerHTML = '<i class="fa-solid fa-user"></i>';
    userLink.href = './user.html';
    mUserLink.href='./user.html';
  } else {
    // Nếu chưa đăng nhập, hiển thị icon login
    userLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    mUserLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    userLink.href = './login.html';
    mUserLink.href = './login.html';
  }
});

// lấy dữ liệu cho user
document.addEventListener('DOMContentLoaded', function () {
  var profileLink = document.getElementById('profile');
  var changePassLink = document.getElementById('change-pass');
  var userForm = document.getElementById('user-form');
  var proWrapper = document.getElementById('pro-wrapper');
  var changeWrapper = document.getElementById('change-wrapper');

  showUserInfo();
  profileLink.addEventListener('click', function (event) {
    event.preventDefault();
    showUserInfo();
  });

  //click vào "Đổi mật khẩu"
  changePassLink.addEventListener('click', function (event) {
    event.preventDefault();
    showChangePasswordForm();
  });

  // Xử lý sự kiện khi submit form cập nhật thông tin người dùng
  userForm.addEventListener('submit', function (event) {
    event.preventDefault();
    updateUserInfo();
    // Hiển thị lại thông tin người dùng sau khi cập nhật
    showUserInfo();
  });

  function showUserInfo() {
    // Ẩn form đổi mật khẩu
    proWrapper.style.display = 'block';
    changeWrapper.style.display = 'none';
  }

  function showChangePasswordForm() {
    proWrapper.style.display = 'none';
    changeWrapper.style.display = 'block';
    changeWrapper.innerHTML = `
      <form onsubmit="changePassword(event)">
        <h1 class="form-heading">Đổi mật khẩu</h1>
        <div class="form-group">
          <i class="far fa-user"></i>
          <input id="new-username" class="form-input" placeholder="Mật khẩu hiện tại">
        </div>
        <div class="form-group">
          <i class="fas fa-key"></i>
          <input id="new-password" type="password" class="form-input" placeholder="Mật khẩu mới">
        </div>
        <div class="form-group">
          <i class="fa-solid fa-lock"></i>
          <input id="confirm-new-password" type="password" class="form-input" placeholder="Nhập lại mật khẩu mới">
        </div>
        <div class="bt-update">
          <input type="submit" value="Lưu" class="user-form">
        </div>
      </form>
    `;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var logoutbutton= document.getElementById('logout');
  var userLink= document.getElementById('user-link');
  var mUserLink= document.getElementById('m-user-link');
  logoutbutton.addEventListener('click', function(){
    localStorage.setItem('isLoggedIn', 'false');
    userLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    mUserLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    window.location.href = './home.html';
  }) 
});


//load store
function start(){
  formregis()
  loadUser()
}
start()
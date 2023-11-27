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

//chuyển hướng trang đăng nhập
//đăng ký, kiểm tra password
//eye-login
document.addEventListener('DOMContentLoaded', function () {
  var passwordInput = document.getElementById('password');
  var togglePassword = document.getElementById('toggle-password');

  togglePassword.addEventListener('click', function () {
    console.log('Clicked on the eye icon');
      var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
  });
});
//eye-regis
document.addEventListener('DOMContentLoaded', function () {
  var passwordInput = document.getElementById('pass');
  var togglePassword = document.getElementById('toggle-password');

  togglePassword.addEventListener('click', function () {
    console.log('Clicked on the eye icon');
      var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
  });
});
document.addEventListener('DOMContentLoaded', function () {
  var passwordInput = document.getElementById('repass');
  var togglePassword = document.getElementById('rtoggle-password');

  togglePassword.addEventListener('click', function () {
    console.log('Clicked on the eye icon');
      var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
  });
});

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
    localStorage.setItem('currentUser', user);
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
      userLink.href = '/pages/user.html';
    } 
    else {
      userLink.href = '/pages/login.html';
    }
  });
}
//sản phẩm
// import { infoPerfume } from "./dataproduct.js"
// var contentPage=''
// var buttonNextPage=''
// var currentPage=1
// var numberPage=Math.ceil(infoPerfume.length/10)


//  function setNumberItem(){
//     var numberItem
//     if(localStorage.getItem('numberItem')===null){
//         numberItem=0;
//     }
//     else numberItem=JSON.parse( localStorage.getItem('numberItem'))
//     document.querySelector('#cart .cart-amount').innerHTML=`${numberItem}` 
//     return numberItem
// }
//  function renderCard(perfume){ 
//     return ` <div class="perfume">
//     <div class="wrap_image">
//     <img class="perfume_image" src=${perfume.image}>
//     <a  class="directPage" href="./detail.html?id=${perfume.id}">
//     <button class='detailProduct'>Xem chi tiết</button>
//     </a>
//     </div>
//     <div class="perfume_info">
//     <div class="perfume_name">
//     ${perfume.name}
//     </div>
//     <div class="perfume_brand">
//     ${perfume.brand}
//     </div>
//     <div class="perfume_price old_price">${perfume.price}đ <h4>(-20%)</h4></div>
//     <div class="perfume_price new_price">${perfume.price*0.8}đ </div>
// </div>
// <button class="addIntoCart">Thêm vào giỏ hàng</button> </div>`
// }
//  function renderPage(currentPage,perfumes){
//     contentPage=''
//     var firstItem=(currentPage-1)*10
//     var lastItem
//     if(currentPage<numberPage)lastItem=currentPage*10
//     else lastItem=perfumes.length
//         for(let j=firstItem;j<lastItem;j++){
//             contentPage+=renderCard(perfumes[j]) 
//         }
//     document.querySelector('.product').innerHTML=contentPage
// }
//  function renderButtonDirect(num){
//     buttonNextPage=""
//     for(let i=1;i<=num;i++){
//         buttonNextPage+=`<button class="nextPage" >${i}</button>`
//     }
//     document.querySelector('.direction').innerHTML=buttonNextPage
// }
// function start(){
    
//   renderPage(1,infoPerfume)
//   deleteFilter()
//   setNumberItem()
//   renderButtonDirect(numberPage)
//   handleFilter()
//   handleNextPage(infoPerfume)
//   handleAddItem()
//   configElasticlunr()

// }
// start()
// lấy dữ liệu cho user
document.addEventListener('DOMContentLoaded', function () {
  var user = localStorage.getItem('currentUser');
  var data = JSON.parse(user);
  // var currentUser = localStorage.getItem('currentUser');
  // var user = JSON.parse(localStorage.getItem(currentUser));

  var usernameInput = document.getElementById('username-l');
  var emailInput = document.getElementById('email-l');
  var telInput = document.getElementById('tel-l');

  usernameInput.value = data.username;
  emailInput.value = data.email;
  telInput.value = data.tel;
});


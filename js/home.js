//banner
document.addEventListener("DOMContentLoaded", function () {
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
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("bar").addEventListener("click", function () {
    console.log("Clicked #bar");
    var menuList = document.querySelector(".menu-list");
    menuList.classList.toggle("active");

    var icons = document.querySelectorAll(".mobile .icons");
    icons.forEach(function (icon) {
      icon.style.display = "none";
    });

    document.getElementById("xmark").style.display = "initial";
    console.log("#xmark displayed");
  });

  document.getElementById("xmark").addEventListener("click", function () {
    console.log("Clicked #xmark");
    var menuList = document.querySelector(".menu-list");
    menuList.classList.remove("active");

    var icons = document.querySelectorAll(".mobile .icons");
    icons.forEach(function (icon) {
      icon.style.display = "flex";
    });

    document.getElementById("xmark").style.display = "none";
    console.log("#xmark hidden");
  });
});

// giữ trạng thái trang truy cập trang
document.addEventListener("DOMContentLoaded", function () {
  var currentPageUrl = window.location.href;
  var menuLinks = document.querySelectorAll(".menu-list li a");
  menuLinks.forEach(function (link) {
    if (link.href === currentPageUrl) {
      link.classList.add("active");
    }
  });
});

//đăng ký, kiểm tra password
//eye-login
import { user } from "./datauser.js";
document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("password");
  var togglePassword = document.getElementById("toggle-password");

  togglePassword.addEventListener("click", function () {
    var type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
});
//eye-regis
document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("pass");
  var togglePassword = document.getElementById("toggle-password");

  togglePassword.addEventListener("click", function () {
    var type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("repass");
  var togglePassword = document.getElementById("rtoggle-password");

  togglePassword.addEventListener("click", function () {
    var type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("pass-l");
  var togglePassword = document.getElementById("toggle-password");

  togglePassword.addEventListener("click", function () {
    console.log("Clicked on the eye icon");
    var type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
});
function formregis() {
  document
    .getElementById("register-button")
    .addEventListener("click", function () {
      location.assign("./register.html");
    });
}

async function regis(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var tel = document.getElementById("tel").value;
  var password = document.getElementById("pass").value;
  var address = document.getElementById("address").value;

  var newUser = {
    username: username,
    phone: tel,
    email: email,
    address: address,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const err = await response.json()
    console.log(err)
    if(response.ok && err.err == 1) {
      alert("Tài khoản đã tồn tại!");
    }
    else if (response.ok && err.err == 0) {
      localStorage.setItem("isLoggedIn", "false");
      window.location.href = "./login.html";
    } 
    else {
      console.error("Failed to register:", response.statusText);
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }

  return false;
}



document.addEventListener("DOMContentLoaded", function () {
  var regisForm = document.getElementById("form-register");
  regisForm.addEventListener("submit", function (event) {
    var password = document.getElementById("pass").value;
    var confirmPassword = document.getElementById("repass").value;
    var errorContainer = document.getElementById("password-error");

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

document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("form-login");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    var userName = document.getElementById("username").value;
    var userPass = document.getElementById("password").value;
    var errorContainer = document.getElementById("account-null");
    // console.log("hello")
    if (!userName || !userPass) {
      errorContainer.textContent = "Bạn chưa nhập tên đăng nhập hoặc mật khẩu!";
    } else {
      try {
        // console.log("hello")
        var response = await fetch("http://localhost:3000/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: userName,
            password: userPass,
          }),
        });
        // console.log(response);
        const result = await response.json();

        // console.log(result);
        if (!result.err) {  
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("access_token_SM", result.access_token);
          window.location.href = "./home.html";
        } else {
          console.error("Failed to login:", response.statusText);
          errorContainer.textContent = "Tài khoản đăng nhập chưa chính xác!";
          localStorage.setItem("isLoggedIn", "false");
        }
      } catch (error) {
        console.error("Error during login:", error);
        localStorage.setItem("isLoggedIn", "false");
      }
    }
  });
});

// function login(userName,userPass) {
//     return user.find(function (u) {
//       return u.tel === userName && u.password === userPass;
//   });
// }
// function loadUser(){
//   document.getElementById('pro-user').textContent = currentUser;
// }
document.addEventListener("DOMContentLoaded", function () {
  var userLink = document.getElementById("user-link");
  var mUserLink = document.getElementById("m-user-link");
  var isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    // Nếu đăng nhập, hiển thị icon user
    userLink.innerHTML = '<i class="fa-solid fa-user"></i>';
    mUserLink.innerHTML = '<i class="fa-solid fa-user"></i>';
    userLink.href = "./user.html";
    mUserLink.href = "./user.html";
  } else {
    // Nếu chưa đăng nhập, hiển thị icon login
    userLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    mUserLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    userLink.href = "./login.html";
    mUserLink.href = "./login.html";
  }
});

// lấy dữ liệu cho user
document.addEventListener("DOMContentLoaded", function () {
  var profileLink = document.getElementById("profile");
  var changePassLink = document.getElementById("change-pass");
  var userForm = document.getElementById("user-form");
  var proWrapper = document.getElementById("pro-wrapper");
  var changeWrapper = document.getElementById("change-wrapper");

  showUserInfo();
  profileLink.addEventListener("click", function (event) {
    event.preventDefault();
    showUserInfo();
  });

  //click vào "Đổi mật khẩu"
  changePassLink.addEventListener("click", function (event) {
    event.preventDefault();
    showChangePasswordForm();
  });

  // Xử lý sự kiện khi submit form cập nhật thông tin người dùng
  userForm.addEventListener("submit", function (event) {
    event.preventDefault();
     updateUserInfo();
    // Hiển thị lại thông tin người dùng sau khi cập nhật
    // showUserInfo();
    window.location.reload();
  });

  async function updateUserInfo() {
    const usernameInput = document.getElementById("username-l").value;
    const emailInput = document.getElementById("email-l").value;
    const telInput = document.getElementById("tel-l").value;
    const addressInput = document.getElementById("address-l").value;
  
    try {
      const access_token = localStorage.getItem("access_token_SM");
      var response = await fetch("http://localhost:3000/api/v1/user/update", {
        method: "POST",
        headers: {
          Authorization: access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: access_token,
          username: usernameInput,
          email: emailInput,
          tel: telInput,
          address: addressInput,
        }),
      });
  
      if (response.ok) {
        alert("User information updated successfully!");
        // Optionally, you can redirect or perform other actions here
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during user information update:", error);
    }
  }
  


  function showUserInfo() {
    proWrapper.style.display = "block";
    changeWrapper.style.display = "none";
    getUser();
  }

    async function getUser() {
      const access_token = localStorage.getItem("access_token_SM");
      const API_URL = "http://localhost:3000/api/v1";
      try {
        const response = await fetch(`${API_URL}/user`, {
          method: "GET",
          headers: {
            Authorization: access_token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await response.json();
        const data = userData.userData
        // Gọi hàm để điền thông tin người dùng vào các trường trên trang
        fillUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }

    // Hàm để điền thông tin người dùng vào các trường trên trang
    function fillUserData(userData) {
      const usernameInput = document.getElementById("username-l");
      const emailInput = document.getElementById("email-l");
      const telInput = document.getElementById("tel-l");
      const addressInput = document.getElementById("address-l");
    
      // Check if the DOM elements exist before trying to update them
      if (usernameInput) {
        usernameInput.value = userData.username || ""; // Use the userData object properties
      }
    
      if (emailInput) {
        emailInput.value = userData.email || "";
      }
    
      if (telInput) {
        telInput.value = userData.phone || "";
      }
    
      if (addressInput) {
        addressInput.value = userData.address || "";
      }
    }

    async function changePassword(event) {
      event.preventDefault();
      var currentPassword = document.getElementById("new-username").value;
      var newPassword = document.getElementById("new-password").value;
      var confirmNewPassword = document.getElementById("confirm-new-password").value;
    
      if (newPassword !== confirmNewPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
      } else {
        try {
          const access_token = localStorage.getItem("access_token_SM");
          var response = await fetch("http://localhost:3000/api/v1/auth/changePassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessToken: access_token,
              oldPassword: currentPassword,
              newPassword: newPassword,
            }),
          });
          const errorData = await response.json();
          console.log(errorData)
          if (errorData.err == 1) {
            alert("Mật khẩu hiện tại không đúng mời bạn nhập lại!");
          }
          else if (errorData.err == 2) {
            alert("Mật khẩu đã được thay đổi thành công!");
            localStorage.setItem("isLoggedIn", "false");
            window.location.href = "./home.html";
          } 
          else {
            alert(`Error: ${errorData.message}`);
          }
        } catch (error) {
          console.error("Error during password change:", error);
        }
      }
    }
    
  

  function showChangePasswordForm() {
    proWrapper.style.display = "none";
    changeWrapper.style.display = "block";
    changeWrapper.innerHTML = `
      <form id="changePasswordForm" onsubmit="changePassword">
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
          <input type="submit" value="Lưu" class="user-form" >
        </div>
      </form>
     

    `;

    document.getElementById("changePasswordForm").onsubmit = changePassword;
  }
});
// aaaaa

document.addEventListener("DOMContentLoaded", function () {
  var logoutbutton = document.getElementById("logout");
  var userLink = document.getElementById("user-link");
  var mUserLink = document.getElementById("m-user-link");
  logoutbutton.addEventListener("click", function () {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("access_token_SM","")
    userLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    mUserLink.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>';
    window.location.href = "./home.html";
  });
});

//load store
function start() {
  formregis();
  // loadUser()
}
start();

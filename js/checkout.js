// import { infoPerfume } from "./dataproduct.js"
const API_URL = 'http://localhost:3000/api/v1'
const access_token = localStorage.getItem("access_token_SM");
let infoPerfume
let infoUser
let listItem = document.getElementsByClassName('product-list')[0]
let userInfo = document.getElementsByClassName('form-info')[0]
let basket = JSON.parse(localStorage.getItem("data")) || []
let totalItems = document.getElementById('total-price')
let isLoggedIn = localStorage.getItem('isLoggedIn') || false
async function getData() {
  await fetch(`${API_URL}/get-pro`)
  .then(res => {
    return res.json()
  })
  .then(data => {
    infoPerfume = data.proList
  })
  .catch(err => {
    console.log(err)
  })
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
    infoUser = userData.userData
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
}

function calculationItem() {
  var totalItem = basket.map((x) => x.item).reduce((x,y) => x+y,0)
    document.querySelector('#checkout .cart-amount').innerHTML= totalItem
}

function total() {
  if(basket.length !== 0) {
    let amount = basket.map((x) => {
      var search = infoPerfume.find((y) => y.id == x.id ) || []
      let priceInt = parseFloat(search.price)
      return priceInt * x.item
    }).reduce((x,y) => x+y,0)
    totalItems.innerText = `${formatNumber(amount)} đ`
  }
  else return totalItems.innerText = 0
}

function generateProList() {
  if(basket.length !== 0) {
    return listItem.innerHTML = basket.map((x) => {
      var search = infoPerfume.find((y) => y.id == x.id ) || []
      return  `
      <li>
          <div id="cart-id-${search.id}" class="shopping-cart-box">
              <div style="width: auto;">
              <img src="${search.image}" alt="">
              </div>
              <div class="des">
                  <span class="cart-pro-title">${search.name}</span>
                  <div class="shopping-cart-price">${formatNumber(search.price)} đ x ${x.item}</div>
              </div>
              <div class="total">${formatNumber(search.price*x.item)} đ</div>
          </div>
      </li>
      `
    }).join('')
  }else {
    listItem.innerHTML = ` `
  }
}

function generateUserInfo() {
  console.log(infoUser)
  if(isLoggedIn == 'true') {
    userInfo.innerHTML = `
    <div class="form-item">
      <label for="username">Họ tên</label>
      <input type="text" class="form-control" name="username" id="username" value="${infoUser.username}">
    </div>
  <div class="form-item">
    <label for="address">Địa chỉ</label>
    <input type="text" class="form-control" name="address" id="address" value="${infoUser.address}">
  </div>
  <div class="form-item">
    <label for="phoneNumber">Điện thoại</label>
    <input type="text" class="form-control" name="phoneNumber" id="phoneNumber" value="${infoUser.phone}" pattern="[0-9]{10}" >
  </div>
  <div class="form-item">
    <label for="email">Email</label>
    <input type="text" class="form-control" name="email" id="email" value="${infoUser.email}">
  </div>`
  } else {
    userInfo.innerHTML = `<div class="form-item">
  <label for="username">Họ tên</label>
  <input type="text" class="form-control" name="username" id="username"
      value="" required="">
  </div>
  <div class="form-item">
  <label for="address">Địa chỉ</label>
  <input type="text" class="form-control" name="address" id="address"
      value="" required="" >
  </div>
  <div class="form-item">
  <label for="phoneNumber">Điện thoại</label>
  <input type="text" class="form-control" name="phoneNumber" id="phoneNumber"
      value="" required="" pattern="[0-9]{10}" >
  </div>
  <div class="form-item">
  <label for="email">Email</label>
  <input type="text" class="form-control" name="email" id="email"
      value="" required="" pattern=".*@.*">
  </div>`
  }
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function handleSubmit() {

}
document.addEventListener('DOMContentLoaded', function () {
  let formEL = document.getElementById("needs-validation")
  formEL.addEventListener("submit", async(e) => {
    e.preventDefault()
    const formData = new FormData(formEL)
    const payment = document.querySelector('input[name="payment"]:checked').value
    const data = {
      accessToken: access_token,  
      payment: payment,
      proList: basket,
      // ...Object.fromEntries(formData)
    }
    console.log(data)

    try {
      let response = await fetch("http://localhost:3000/api/v1/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const flag = await response.json();

      if (basket.length == 0 ) {
        alert("Bạn chưa có sản phẩm nào để thanh toán! Hãy tới cửa hàng để chọn sản phẩm")
      } else {
        
        alert("Chúc mừng bạn đã đặt hàng thành công!")
        username.value = ""
        address.value = ""
        email.value = ""
        phoneNumber.value = ""
        window.localStorage.removeItem('data')
        // location.reload();
        window.location.href = "./home.html";
      }
    }
    catch (error) {
      console.error(error)
    }

   
  })
})
  

async function start() {
  await getData()
  calculationItem()
  generateProList()
  generateUserInfo()
  total()
}
start()
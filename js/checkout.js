import { infoPerfume } from "./dataproduct.js"
let listItem = document.getElementsByClassName('product-list')[0]
let userInfo = document.getElementsByClassName('form-info')[0]
let basket = JSON.parse(localStorage.getItem("data")) || []
let totalItems = document.getElementById('total-price')

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
      return `
      <input type="hidden" name="id" value="${x.id}">
      <input type="hidden" name="price" value="${search.price}">
      <input type="hidden" name="item" value="${x.item}">

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
    })
  }else {
    listItem.innerHTML = ``
  }
}

function generateUserInfo() {
  var a
  if(false) {
    userInfo.innerHTML = `
    <div class="form-item">
      <label for="username">Họ tên</label>
      <input type="text" class="form-control" name="username" id="username" value="Dương Nguyễn Phú Cường">
    </div>
  <div class="form-item">
    <label for="address">Địa chỉ</label>
    <input type="text" class="form-control" name="address" id="address" value="130 Xô Viết Nghệ Tỉnh">
  </div>
  <div class="form-item">
    <label for="phoneNumber">Điện thoại</label>
    <input type="text" class="form-control" name="phoneNumber" id="phoneNumber" value="0915659223" pattern="[0-9]{10}" >
  </div>
  <div class="form-item">
    <label for="email">Email</label>
    <input type="text" class="form-control" name="email" id="email" value="phucuong@ctu.edu.vn">
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

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("needs-validation").addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e)
  });
});

function start() {
  calculationItem()
  generateProList()
  generateUserInfo()
  total()
}
start()
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
  handleRemoveItem()
  handleIncrement()
  handleDecrement()
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
    userInfo.innerHTML = `<div class="form-item">
  <label for="kh_ten">Họ tên</label>
  <input type="text" class="form-control" name="kh_ten" id="kh_ten"
      value="Dương Nguyễn Phú Cường" readonly="">
  </div>
  <div class="form-item">
  <label for="kh_diachi">Địa chỉ</label>
  <input type="text" class="form-control" name="kh_diachi" id="kh_diachi"
      value="130 Xô Viết Nghệ Tỉnh" readonly="">
  </div>
  <div class="form-item">
  <label for="kh_dienthoai">Điện thoại</label>
  <input type="text" class="form-control" name="kh_dienthoai" id="kh_dienthoai"
      value="0915659223" readonly="">
  </div>
  <div class="form-item">
  <label for="kh_email">Email</label>
  <input type="text" class="form-control" name="kh_email" id="kh_email"
      value="phucuong@ctu.edu.vn" readonly="">
  </div>`
  } else {
    userInfo.innerHTML = `<div class="form-item">
  <label for="kh_ten">Họ tên</label>
  <input type="text" class="form-control" name="kh_ten" id="kh_ten"
      value="">
  </div>
  <div class="form-item">
  <label for="kh_diachi">Địa chỉ</label>
  <input type="text" class="form-control" name="kh_diachi" id="kh_diachi"
      value="">
  </div>
  <div class="form-item">
  <label for="kh_dienthoai">Điện thoại</label>
  <input type="text" class="form-control" name="kh_dienthoai" id="kh_dienthoai"
      value="" >
  </div>
  <div class="form-item">
  <label for="kh_email">Email</label>
  <input type="text" class="form-control" name="kh_email" id="kh_email"
      value="">
  </div>`
  }
}
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


function start() {
  calculationItem()
  generateProList()
  generateUserInfo()
  total()
}
start()
// import { infoPerfume } from "./dataproduct.js"
const API_URL = 'http://localhost:3000/api/v1'
let infoPerfume
let cart = document.getElementsByClassName('shopping-cart-container')[0]
let basket = JSON.parse(localStorage.getItem("data")) || []
let totalItems = document.getElementById('total-price')
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
}

function handleIncrement() {
  var incrementBtns = document.querySelectorAll('.increment')
  for( let button of incrementBtns){
    button.onclick = function(e) {
      var id = e.target.parentNode.children[1].id
      var search = basket.find((x)=> x.id === id)
      if(search === undefined) {
        basket.push({
          id: id,
          item: 1,
        })
      }else {
        search.item += 1
      }
      calculation()
      generateCart()
      total()
      localStorage.setItem("data", JSON.stringify(basket))
    }
  }
}

function handleDecrement() {
  var decrementBtns = document.querySelectorAll('.decrement')
  for( let button of decrementBtns){
    button.onclick = function(e) {
      var id = e.target.parentNode.children[1].id
      var search = basket.find((x)=> x.id === id)
      search.item -= 1
      basket = basket.filter((x) => x.item !== 0)
      calculation()
      generateCart()
      total()
      localStorage.setItem("data", JSON.stringify(basket))
    }
  }
}

function handleRemoveItem() {
  var removeBtns = document.querySelectorAll('.trash')
  for( let button of removeBtns){
      button.onclick=function(e){
        e.preventDefault();
        var id = e.target.getAttribute('data-index')
        basket = basket.filter((x => x.id != id))
        generateCart()
        total()
        calculation() 
        localStorage.setItem("data", JSON.stringify(basket))
      }
  }
}

function calculation() {
  var totalItem = basket.map((x) => x.item).reduce((x,y) => x+y,0)
  document.querySelector('#cart .cart-amount').innerHTML= totalItem
  document.querySelector('#cart-icon .cart-amount').innerHTML= totalItem
  localStorage.setItem("data", JSON.stringify(basket))
}

// cart
function generateCart() {
  if(basket.length !== 0) {
    return cart.innerHTML = basket.map((x) => {
      var search = infoPerfume.find((y) => y.id == x.id ) || []
      return `
      <div id="cart-id-${search.id}" class="shopping-cart-box">
          <div style="width: auto;">
          <img src="${search.image}" alt="">
          </div>
          <div class="des">
              <span class="cart-pro-category">${search.brand}</span>
              <h5 class="cart-pro-title">${search.name}</h5>
              <div class="input-number">
              <button class="shopping-cart-btn decrement">-</button>
              <input id="${search.id}" type="number" value="${x.item}" class="shopping-cart-quantity">
              <button class="shopping-cart-btn increment">+</button>
              </div>
              <h4 class="shopping-cart-price">${formatNumber(search.price)} đ</h4>
          </div>
          <i class="fas fa-trash trash" data-index="${x.id}"></i>
      </div>
      `
    }).join('')
  }else {
    cart.innerHTML = ``
  }
  handleRemoveItem()
  handleIncrement()
  handleDecrement() 
}

function total() {
  if(basket.length !== 0) {
    let amount = basket.map((x) => {
      var search = infoPerfume.find((y) => y.id == x.id ) || []
      let priceInt = parseFloat(search.price)
      return priceInt * x.item
    }).reduce((x,y) => x+y,0)
    totalItems.innerText = `${formatNumber(amount)} đ`
    // totalItems.innerText = `${(amount*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}`
  }
  else return totalItems.innerText = 0
  handleRemoveItem()
  handleIncrement()
  handleDecrement()
}
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

if(document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}else {
  ready();
}
async function ready() {
  await getData()
  generateCart()
  total()
  handleRemoveItem()
  handleIncrement()
  handleDecrement() 
}
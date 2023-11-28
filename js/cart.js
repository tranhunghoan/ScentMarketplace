let cart = document.getElementsByClassName('shopping-cart-container')[0]
let basket = JSON.parse(localStorage.getItem("data")) || []
let totalItems = document.getElementById('total-price')
if(bar) {
  bar.addEventListener('click', () => {
    navbar.classList.add('active');
  })
}
if(close) {
  close.addEventListener('click', () => {
    navbar.classList.remove('active');
  })
}
function detailPage(){
  location.assign("detail.html");
}

function generateShop() {
  let listProContainers = document.getElementsByClassName('list-products')
  for(var i = 0; i < listProContainers.length; i++) {
    let listProducts = listProContainers[i]
    listProducts.innerHTML = product.map((product)=>{
      return `
      <div class="pro">
        <div class="hovered">
          <img src="${product.img}" alt="">
          <button onclick="detailPage()">Qick View</button>
        </div>
        <div class="des">
          <span>${product.cate}</span>
          <h5>${product.title}</h5>
          <div class="star">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
          </div>
          <h4>${product.price} VND</h4>
        </div>
        <i onclick="addToCart(${product.id})" class="fas fa-shopping-cart cart"></i>
      </div>
      `
    })
  }
}
function generateNewShop() {
  let listProContainers = document.getElementsByClassName('list-new')
  for(var i = 0; i < listProContainers.length; i++) {
    let listProducts = listProContainers[i]
    listProducts.innerHTML = newProduct.map((product)=>{
      return `
      <div class="pro">
        <div class="hovered">
          <img src="${product.img}" alt="">
          <button onclick="detailPage()">Qick View</button>
        </div>
        <div class="des">
          <span>${product.cate}</span>
          <h5>${product.title}</h5>
          <div class="star">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
          </div>
          <h4>${product.price} VND</h4>
        </div>
        <i onclick="addToCart(${product.id})" class="fas fa-shopping-cart cart"></i>
      </div>
      `
    })
  }
}

function moveToShop() {
  var element = document.getElementsByClassName('shop-now')[0]
  var headerOffset = 80
  var elementPosition = element.getBoundingClientRect().top
  var offsetPosition = elementPosition + window.pageYOffset - headerOffset
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  }); 
}

function addToCart(id) {
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
  calculationMobile()
  updateItems(id)
  localStorage.setItem("data", JSON.stringify(basket))
}

function decrement(id) {
  var search = basket.find((x)=> x.id === id)
  if(search.id === 0) return
  else {
    search.item -= 1
  }
  updateItems(id)
  basket = basket.filter((x) => x.item !== 0)
  generateCart()
  calculation()
  calculationMobile()
  localStorage.setItem("data", JSON.stringify(basket))
}

function updateItems(id) {
 var search = basket.find((x) => x.id === id)
 document.getElementById(id).value = search.item
 calculation()
 calculationMobile()
 total()
}
function calculation() {
  var cartIcon = document.getElementById('cart-amount')
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0)
  localStorage.setItem("data", JSON.stringify(basket))
}
function calculationMobile() {
  var cartIcon = document.getElementById('cart-amount-mobile')
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0)
  localStorage.setItem("data", JSON.stringify(basket))
}

// cart
function generateCart() {
}



function removeItem(id) {
  basket = basket.filter((x => x.id !== id))
  generateCart()
  calculation()
  calculationMobile()
  total()
  localStorage.setItem("data", JSON.stringify(basket))
}

function total() {
  
  if(basket.length !== 0) {
    let amount = basket.map((x) => {
      var search = product.find((y) => y.id === x.id ) || newProduct.find((y) => y.id === x.id ) || []
      let priceInt = parseFloat(search.price)
      return priceInt * x.item
    }).reduce((x,y) => x+y,0)
    totalItems.innerText = `${(amount*1000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}`
  }else return totalItems.innerText = 0
}

if(document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}else {
  ready();
}

function ready() {
  generateShop()
  generateNewShop()
  calculation()
  calculationMobile()
  total()
  generateCart()
}
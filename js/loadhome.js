import { infoPerfume } from "./dataproduct.js"
var contentPage=''
var numberPage=Math.ceil(infoPerfume.length/10)
var basket = JSON.parse(localStorage.getItem("data")) || []

 function renderCard(perfume){ 
  return ` <div class="perfume">
  <div class="wrap_image">
  <img class="perfume_image" src=${perfume.image}>
  <a  class="directPage" href="./detail.html?id=${perfume.id}">
  <button class='detailProduct'>Xem chi tiết</button>
  </a>
  </div>
  <div class="perfume_info">
  <a href="./detail.html?id=${perfume.id}" style="text-decoration:none">
  <div class="perfume_name">${perfume.name}</div>
  </a>
  <div class="perfume_brand">
  ${perfume.brand}
  </div>
  <div class="perfume_price old_price">${formatNumber( perfume.price) }đ <h4>(-10%)</h4></div>
  <div class="perfume_price new_price">${formatNumber( perfume.price*0.9)}đ </div>
</div>
<button class="addIntoCart" data-index="${perfume.id}">Thêm vào giỏ hàng</button> </div>`
}
 function renderPage(currentPage,numberPage,perfumes){
    contentPage=''
    var firstItem=(currentPage-1)*10
    var lastItem
    if(currentPage<numberPage)lastItem=currentPage*10
    else lastItem=perfumes.length
        for(let j=firstItem;j<lastItem;j++){
            contentPage+=renderCard(perfumes[j]) 
        }
    document.querySelector('.n-product').innerHTML=contentPage
}
 function duplicateAndMove(event) {
    // Lấy sản phẩm gốc
    let originalProduct = event.target.parentElement.querySelector('.perfume_image');
    // Tạo bản sao của sản phẩm gốc
    let clonedProduct = originalProduct.cloneNode(true);
    //Gán thuộc tính cho sản phẩm clone
    clonedProduct.id = "clonedProduct"; 
    clonedProduct.style.position = "absolute";
    clonedProduct.style.zIndex = "1000"
    clonedProduct.style.borderRadius = "50%"
    clonedProduct.style.top = '20px'; // Giữ nguyên vị trí của sản phẩm gốc
    clonedProduct.style.left = '20px'; // Giữ nguyên vị trí của sản phẩm gốc
    event.target.parentElement.appendChild(clonedProduct);
    let clonedRect = clonedProduct.getBoundingClientRect();
    // Lấy vị trí của icon giỏ hàng
    let cartIcon = document.querySelector('.fa-cart-shopping');
    let cartRect = cartIcon.getBoundingClientRect();
  
    // Di chuyển bản sao vào vị trí của icon giỏ hàng
    let xOffset = cartRect.left - clonedRect.left-clonedProduct.offsetWidth*0.5+15;
    let yOffset = -clonedRect.top-clonedProduct.offsetHeight*0.5+20;
   // event.target.parentElement.style.overflow='visible'
    clonedProduct.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(0.05)`;
    setTimeout(() => {
        clonedProduct.remove()
    },800);

    // Sau khi di chuyển hoàn tất, có thể thêm sản phẩm vào giỏ hàng và xóa bản sao
}
 function handleAddItem(){
  var buttonAddintocart=document.querySelectorAll('.addIntoCart')
  for( let button of buttonAddintocart){
    button.onclick=function(e){
      duplicateAndMove(e)
      var id = e.target.getAttribute('data-index')
      var search = basket.find((x)=> x.id === id)
      if(search === undefined) {
        basket.push({
          id: id,
          item: 1,
        })
      }else {
        search.item += 1
      }
      calculationItem()
    localStorage.setItem("data", JSON.stringify(basket))
    }
  }
}
function calculationItem() {
  var totalItem = basket.map((x) => x.item).reduce((x,y) => x+y,0)
    document.querySelector('#cart .cart-amount').innerHTML= totalItem
    document.querySelector('#cart-icon .cart-amount').innerHTML= totalItem
}
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
 function start(){
    renderPage(1,numberPage,infoPerfume)
    handleAddItem()
}
start()
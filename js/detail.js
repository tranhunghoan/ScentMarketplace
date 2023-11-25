import { infoPerfume } from "./dataproduct.js";
var queryParams = {};
var numberItem
function setCount(){
    if(localStorage.getItem('numberItem')===null){
        numberItem=0;
    }
    else numberItem=JSON.parse( localStorage.getItem('numberItem'))
    document.querySelector('.cart .numberProduct').innerHTML=`${numberItem}` 
}
function handleURL(){
    var url = window.location.href;
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        queryParams[key] = value;
        });
}
function renderDetailPage(queryParams){
   var idProduct=parseInt(queryParams.id)
   var product=infoPerfume[idProduct-1]
   var detailHtml=`<div class="imageProduct">
        <div class="slide-image">
        <div class="wrap-slide">
        <img class="perfume_image_detail " src=${product.image} >
        <img class="perfume_image_detail " src=${product.image} >
        <img class="perfume_image_detail " src=${product.image} >
        <img class="perfume_image_detail " src=${product.image} >
        </div>
        </div>
        <div class="mini-image">
        <img tax-index="1"class="perfume_image_detail " src=${product.image} >
        <img tax-index="2"class="perfume_image_detail " src=${product.image} >
        <img tax-index="3"class="perfume_image_detail " src=${product.image} >
        <img tax-index="4"class="perfume_image_detail " src=${product.image} >
        </div>
        </div>
        <div class="infoProduct">
        <div class="productName">${product.name}</div>
        <div class="line"></div>
        <table>
        <tr>
            <th>Nhãn hiệu</th>
            <td> ${product.brand}</td>
        </tr>
        <tr>
            <th>Xuất xứ</th>
            <td> ${product.origin}</td>
        </tr>
        <tr>
            <th>Giới tính</th>
            <td> ${product.sex}</td>
        </tr>
        <tr>
            <th>Nhóm hương</th>
            <td>  ${product.incense}</td>
        </tr>
        <tr>
            <th>Nồng độ</th>
            <td>  ${product.concentration}</td>
        </tr>
        <tr>
            <th>Phong cách</th>
            <td>  ${product.style}</td>
        </tr>
    </table>
        <h3>Hương đặc trưng</h3>
        <div class="description">${product.description}</div>
        <div class="productPrice">Giá: <h4 class="old_price">${formatNumber(product.price)}đ</h4> <h4 class="new_price">${formatNumber(product.price*0.9)}đ</h4></div>
        <div class="countProduct">
        Số lượng :
        <input type="number" class="number" name="quantity" min="1" max="100" value=1>
        </div>
        <button class="addIntoCart">Thêm vào giỏ hàng</button>
        <button class="buyNow">Mua ngay</button>
 
        <ul>
        <li><i class="fa-sharp fa-regular fa-circle-check"></i> Free ship</li>
        <li><i class="fa-sharp fa-regular fa-circle-check"></i> Có sẵn</li>
        <li><i class="fa-sharp fa-regular fa-circle-check"></i> Bảo hành 1 đổi 1</li>
        </ul>
                 </div>`
    document.querySelector('.detailPage').innerHTML=detailHtml
}
function duplicateAndMove(event) {
    // Lấy sản phẩm gốc
    console.log(event.target.parentElement.previousElementSibling)
    let originalProduct = event.target.parentElement.previousElementSibling.querySelector('.perfume_image_detail');
    
    // Tạo bản sao của sản phẩm gốc
    let clonedProduct = originalProduct.cloneNode(true);
    //Gán thuộc tính cho sản phẩm clone
    clonedProduct.id = "clonedProduct"; 
    clonedProduct.style.position = "absolute";
    clonedProduct.style.zIndex = "1"
    clonedProduct.style.borderRadius = "50%"
    clonedProduct.style.top = '20px'; // Giữ nguyên vị trí của sản phẩm gốc
    clonedProduct.style.left = '20px'; // Giữ nguyên vị trí của sản phẩm gốc
    event.target.parentElement.appendChild(clonedProduct);
    let clonedRect = clonedProduct.getBoundingClientRect();
    // Lấy vị trí của icon giỏ hàng
    let cartIcon = document.querySelector('.fa-cart-shopping');
    let cartRect = cartIcon.getBoundingClientRect();
  
    // Di chuyển bản sao vào vị trí của icon giỏ hàng
    let xOffset = cartRect.left - clonedRect.left-100;
    let yOffset = -clonedRect.top-125;
   // event.target.parentElement.style.overflow='visible'
    clonedProduct.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(0.05)`;
    setTimeout(() => {
        clonedProduct.remove()
    },800);

    // Sau khi di chuyển hoàn tất, có thể thêm sản phẩm vào giỏ hàng và xóa bản sao
}
function handleButtonAddProduct(){
    //setNumberItem()
    var numberProduct
    var button=document.querySelector('.addIntoCart')
    const canvas = document.querySelector('.detailPage');

    const jsConfetti = new JSConfetti();

    button.addEventListener('click', () => {
    jsConfetti.addConfetti()
    })
    button.onclick=function(e){
       // duplicateAndMove(e)
        numberProduct=JSON.parse(localStorage.getItem('numberItem'))
         numberProduct+=parseInt(document.querySelector('input.number').value)
        document.querySelector('.cart .numberProduct').innerHTML=`${numberProduct}`
        localStorage.setItem('numberItem',JSON.stringify(numberProduct)) 
    }
}
function handleClickImage(){
    var imgMini=document.querySelectorAll('.mini-image img')
    var imgSlide=document.querySelector('.wrap-slide')
    for(let i=0;i<imgMini.length;i++){
        imgMini[i].onclick=function(e){

            var distance=-(parseInt(e.target.getAttribute("tax-index"))-1)*400
            console.log(e.target)
           imgSlide.style.transform=`translate(${distance}px,0)`
        }
    }

}
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
function start(){
    handleURL()
    setCount()
    renderDetailPage(queryParams)
    handleButtonAddProduct()
    handleClickImage()
}
start()
//console.log(queryParams); 
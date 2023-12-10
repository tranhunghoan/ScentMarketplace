const API_URL = 'http://localhost:3000/api/v1'
let infoPerfume
var queryParams = {};
var basket = JSON.parse(localStorage.getItem("data")) || []

async function getData() {
    await fetch(`${API_URL}/get-pro`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      infoPerfume = data.proList
      console.log(infoPerfume)
    })
    .catch(err => {
      console.log(err)
    })
  }

function handleURL(){
    var url = window.location.href;
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        queryParams[key] = value;
        });
}

function renderDetailPage(queryParams){
   var idProduct=parseInt(queryParams.id)
   var product=infoPerfume.find((x) => {return x.id == idProduct})
   console.log(product)
   var detailHtml=`<div class="imageProduct">
        <div class="slide-image">
        <div class="wrap-slide">
        <img class="perfume_image_detail " src="${product.image}">
        <img class="perfume_image_detail " src="../assets/images/mini-image1.jpg" >
        <img class="perfume_image_detail " src="../assets/images/mini-image2.jpg" >
        <img class="perfume_image_detail " src="../assets/images/mini-image3.jpg" >
        </div>
        </div>
        <div class="mini-image">
        <img tax-index="1"class="perfume_image_detail " src="${product.image}">
        <img tax-index="2"class="perfume_image_detail " src="../assets/images/mini-image1.jpg" >
        <img tax-index="3"class="perfume_image_detail " src="../assets/images/mini-image2.jpg" >
        <img tax-index="4"class="perfume_image_detail " src="../assets/images/mini-image3.jpg" >
        </div>
        </div>
        <div class="infoProduct">
        <div class="productName">${product.name}</div>
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
        <h3 style="margin:20px 0 15px 0;">Hương đặc trưng</h3>
        <div class="description">${product.description}</div>
        <div class="productPrice">Giá: <h4 class="old_price">${formatNumber(product.price)}đ</h4> <h4 class="new_price">${formatNumber(product.price*0.9)}đ</h4></div>
        <div class="countProduct">
        Số lượng :
        <li><i class="fa-solid fa-minus"></i></li>
        <div class="amount_product">1</div>
        <li><i class="fa-solid fa-plus"></i></li>
        </div>
        <button class="addIntoCart detail_page">Thêm vào giỏ hàng</button>
        <a href="./cart.html" class="buyNow">Mua ngay</a>
 
        <ul>
        <li><i class="fa-sharp fa-regular fa-circle-check"></i> Free ship</li>
        <li><i class="fa-sharp fa-regular fa-circle-check"></i> Có sẵn</li>
        <li><i class="fa-sharp fa-regular fa-circle-check"></i> Bảo hành 1 đổi 1</li>
        </ul>
                 </div>`
    document.querySelector('.detailPage').innerHTML=detailHtml
}

function calculationItem() {
    var totalItem = basket.map((x) => x.item).reduce((x,y) => x+y,0)
    document.querySelector('#cart .cart-amount').innerHTML= totalItem
    document.querySelector('#cart-icon .cart-amount').innerHTML= totalItem
}

function handleButtonAddProduct(){
    var button=document.querySelector('.addIntoCart')
    const jsConfetti = new JSConfetti();
    const increase=document.querySelector('.fa-plus')
    const decrease=document.querySelector('.fa-minus')
    var amount_product=parseInt(document.querySelector('.amount_product').innerHTML);     
    increase.onclick=function(){
       amount_product++;
       document.querySelector('.amount_product').innerHTML=`${amount_product}`
    }
    decrease.onclick=function(){
        if(amount_product!=1){
            amount_product--;
            document.querySelector('.amount_product').innerHTML=`${amount_product}`
        }
       
     }
    button.addEventListener('click', () => {
    jsConfetti.addConfetti()
    })
    button.onclick=function(e){
        var id = queryParams.id
        var search = basket.find((x)=> x.id === id)
        if(search === undefined) {
          basket.push({
            id: id,
            item: amount_product,
          })
        }else {
          search.item += amount_product
        }
        calculationItem()
      localStorage.setItem("data", JSON.stringify(basket))
    }
}
function handleClickImage(){
    var imgMini=document.querySelectorAll('.mini-image img')
    var imgSlide=document.querySelector('.wrap-slide')
    for(let i=0;i<imgMini.length;i++){
        imgMini[i].onclick=function(e){

            var distance=-(parseInt(e.target.getAttribute("tax-index"))-1)*400
    
           imgSlide.style.transform=`translate(${distance}px,0)`
        }
    }

}
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
async function start(){
    await getData()
    handleURL()
    calculationItem()
    renderDetailPage(queryParams)
    handleButtonAddProduct()
    handleClickImage()
}
start()